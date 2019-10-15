cc.Class({
    extends: cc.Component,
    properties: {
        speed: cc.v2(0,0),
        beginSpeed: cc.v2(500,0),
        airdrag: 50,
		player:null,
        direction: 1,//方向，
        maxDistance:400,
        distance:0,
		minspeed:cc.v2(600,0),
        nowlen:cc.v2(0,0),
        damage:2,
        Lead:{
            default: null,
            type: cc.Node,
        },
    },

    start:function(){
    },

    onLoad: function () {//火龙的武器，，，

        cc.director.getCollisionManager().enabled = true;
        this.player = this.node.getComponent(cc.Animation);//
        if(ALL.LeadFaceDir==1){
            this.direction=1;
            this.player.play("Fierydragon_Arms_right");
            this.speed.x=this.beginSpeed.x;
        }else{
            this.direction=-1;
            this.player.play("Fierydragon_Arms_left");
            this.speed.x=-this.beginSpeed.x;
        }
        this.collisionX = 0;
        this.collisionY = 0;
    },

    onDestory: function(){
        //cc.log("武器是"+this.Lead.getComponent("Lead_control").ArmsNum.x);
    },

    onDisabled: function () {//????
        cc.director.getCollisionManager().enabled = false;
    },
    
    update :function(dt){
        if (this.collisionX === 0) {//如果没发生任何x碰撞计算空气阻力
            this.speed.x -= this.airdrag*this.direction * dt;
        }
        this.nowlen.x=this.speed.x * dt;
        this.nowlen.y=this.speed.y * dt;
		this.distance+=Math.sqrt((this.nowlen.x*this.nowlen.x)+(this.nowlen.y*this.nowlen.y));
        if(this.distance>this.maxDistance){
            ALL.nowArmsNum.x=ALL.nowArmsNum.x==0?0:ALL.nowArmsNum.x-1;
            this.node.destroy();
        }
        this.node.x += this.nowlen.x;
        this.node.y += this.nowlen.y;
    },

    onCollisionEnter: function (other, self){
        if(other.node.name.indexOf("Object")!=-1){
            ALL.nowArmsNum.x=ALL.nowArmsNum.x==0?0:ALL.nowArmsNum.x-1;
            this.node.destroy();
        }else if(other.node.name.indexOf("Enemy")==0){
            if(other.node.getComponent("EnemyPublic").state_effecf=="null"){
                other.node.getComponent("EnemyPublic").changeLife(-this.damage);
                ALL.nowArmsNum.x=ALL.nowArmsNum.x==0?0:ALL.nowArmsNum.x-1;
                this.node.destroy();
            }
        }
    },
    
});
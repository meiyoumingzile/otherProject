cc.Class({
    extends: cc.Component,
    properties: {
        speed: cc.v2(0,0),
        beginSpeed: cc.v2(600,0),
        airdrag: 50,
        gravity: -600,
        player:null,
        direction: 1,//方向，
        minspeed:cc.v2(600,0),
        nowlen:cc.v2(0,0),
        damage:1,
        Lead:{
            default: null,
            type: cc.Node,
        },
    },

    start:function(){
    },

    onLoad: function () {//、、、/////////////////////////人物的小飞镖武器，，，
        cc.director.getCollisionManager().enabled = true;
        this.speed.x=ALL.LeadFaceDir*650;
        this.speed.y=10;
        this.collisionX = 0;
        this.collisionY = 0;
    },

    onDestory: function(){
        //cc.log("武器是"+this.Lead.getComponent("Lead_control").nowArmsNum.x);
    },

    onDisabled: function () {//????
        cc.director.getCollisionManager().enabled = false;
    },
    
    update :function(dt){

        if (this.collisionY === 0) {//如果没发生任何Y周碰撞，则计算重力
            this.speed.y += this.gravity * dt;
            /*if (Math.abs(this.speed.y) > this.maxSpeed.y) {
                this.speed.y = this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y;
            }*/
        }
        if (this.collisionX === 0) {//如果没发生任何x碰撞计算空气阻力
            this.speed.x -= this.airdrag*this.direction * dt;
        }
        this.nowlen.x=this.speed.x * dt;
        this.nowlen.y=this.speed.y * dt;
        this.node.x += this.nowlen.x;
        this.node.y += this.nowlen.y;
    },

    setspeed:function(d){
        this.speed.x=d;
    },
    


    onCollisionEnter: function (other, self){
        if(other.node.name.indexOf("Object")!=-1){//碰撞的名字包含自身或者其他武器
            ALL.nowArmsNum.x=ALL.nowArmsNum.x==0?0:ALL.nowArmsNum.x-1;
            this.node.destroy();
        }else if(other.node.name.indexOf("Enemy")==0){
            if(other.node.getComponent("EnemyPublic").state_effecf=="null"){
                other.node.getComponent("EnemyPublic").changeLife(-this.damage);
                ALL.nowArmsNum.x=ALL.nowArmsNum.x==0?0:ALL.nowArmsNum.x-1;
                this.node.destroy();
            }
        }else if(other.node.name.indexOf("Stone")!=-1){
            this.speed.x=-this.speed.x;
            
        }
    },
});
<?php       include '../../PHP/public.php';    $input = file_get_contents('php://input');    $arr = json_decode($input,true);       if(isset($arr['name'])){        $name=$arr['name'];        $sql="select * from brand where name='$name';";        $conn=consql();        $category=array();        if($conn){            $res=mysqli_query($conn,$sql);            $row=mysqli_fetch_array($res,MYSQLI_NUM);            if(count($row)==0){                $dir=array('name'=>$name);                $sql=getSqlsen_insert('brand',$dir,"1");                mysqli_query($conn,$sql);                echo 1;            }else{                echo 0;            }        }    }?>
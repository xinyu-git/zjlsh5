function autoPlayMusic() {   
    // 自动播放音乐效果，解决浏览器或者APP自动播放问题 
    function musicInBrowserHandler() {   
        musicPlay(true);   
        document.body.removeEventListener('touchstart', musicInBrowserHandler);   
    }   
    document.body.addEventListener('touchstart', musicInBrowserHandler);   
    // 自动播放音乐效果，解决微信自动播放问题  
    function musicInWeixinHandler() {   
        musicPlay(true);   
        document.addEventListener("WeixinJSBridgeReady", function () {   
            musicPlay(true);   
        }, false);   
        document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);   
    }   
    document.addEventListener('DOMContentLoaded', musicInWeixinHandler);   
}   
function musicPlay(isPlay) {   
    var media = document.getElementById('myMusic');   
    if (isPlay && media.paused) {   
        media.play();   
    }   
    if (!isPlay && !media.paused) {   
        media.pause();   
    }   
}  




function autoPlayMusic(id) {   
	musicPlay(true,id);  
    // 自动播放音乐效果，解决浏览器或者APP自动播放问题 
    function musicInBrowserHandler() {   
        musicPlay(true,id);   
        document.body.removeEventListener('touchstart', musicInBrowserHandler);   
    }   
    document.body.addEventListener('touchstart', musicInBrowserHandler);   
    // 自动播放音乐效果，解决微信自动播放问题  
    function musicInWeixinHandler() {   
        musicPlay(true,id);   
        document.addEventListener("WeixinJSBridgeReady", function () {   
            musicPlay(true,id);   
        }, false);   
        document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);   
    }   
    document.addEventListener('DOMContentLoaded', musicInWeixinHandler);   
}   
function musicPlay(isPlay,id) {   
    var media = document.getElementById(id);   
    if (isPlay && media.paused) {   
        media.play();   
    }   
    if (!isPlay && !media.paused) {   
        media.pause();   
    }   
} 



function audioAutoPlay(id){  
    var audio = document.getElementById(id),  
        play = function(){  
            audio.play();  
            document.removeEventListener("touchstart",play, false);  
        };  
    audio.play();  
    document.addEventListener("WeixinJSBridgeReady", function () {  
        play();  
    }, false);  
    document.addEventListener('YixinJSBridgeReady', function() {  
        play();  
    }, false);  
    document.addEventListener("touchstart",play, false);  
}  
audioAutoPlay('Jaudio');  

var videoPlayer = (function() {
    var $livePlayer = document.getElementsByClassName('liveplayer')[0];
    var $video = document.getElementsByTagName('video')[0];
    var $playBtn = document.getElementsByClassName('btn')[0];
    var $loading = document.getElementsByClassName('loading')[0];
    var streamInterval = null;

    $playBtn.addEventListener('click', function() {
        showLoading();
        $video.play();
    })

    function showLoading() {
        $loading.style.display = 'block';
    }

    function hideLoading() {
        $loading.style.display = 'none';
    }

    function showVideo() {
        $livePlayer.style.display = 'block';
        $video.style.display = 'block';
    }

    function hideVideo() {
        $video.style.display = 'none';
        $livePlayer.style.display = 'block';
    }

    $video.addEventListener('play', function() {
       debug('trigger video play status');

       debug('video readyState: '+$video.readyState);

       debug('video networkState: '+$video.networkState);

       showLoading();
    })

    $video.addEventListener('playing', function() {
       debug('trigger video playing status');

       debug('video readyState: '+$video.readyState);

       debug('video networkState: '+$video.networkState);

       debug($video.error && $video.error.code);

       hideLoading();
       showVideo();

       checkVideoStream();
    })

    $video.addEventListener('timeupdate', function() {
       debug('trigger video timeupdate status');

       debug('video readyState: '+$video.readyState);

       debug('video networkState: '+$video.networkState);
    })

    $video.addEventListener('pause', function() {
       debug('trigger video pause status');

       debug('video readyState: '+$video.readyState);

       debug('video networkState: '+$video.networkState);

       debug($video.error && $video.error.code);

       debug('video duration: '+$video.duration);
    })

    $video.addEventListener('ended', function() {
       debug('trigger video ended status');

       debug('video duration: '+$video.duration);

       debug($video.error.code);

       showLoading();
       hideVideo();

       $video.play();

    })

    function debug(con) {
        console.log(con);
        var date = new Date();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        var $debug = document.getElementsByClassName('debug')[0];
        var $beforeP = document.getElementsByTagName('p')[0];
        var $p = document.createElement('p');
        var $textNode = document.createTextNode('['+hour+':'+minutes+':'+seconds+']: '+con);
        $p.appendChild($textNode);

        if($beforeP) {
            $debug.insertBefore($p, $beforeP);
        }else {
            $debug.appendChild($p);
        }
    }

    function checkVideoStream() {
        if(streamInterval) {
            clearInterval(streamInterval);
        }

        streamInterval = setInterval(function() {
            if($video.readyState == 2 || $video.readyState == 1) {
                $video.play();
                clearInterval(streamInterval);
                return;
            }

            if($video.networkState == 3) {
                $video.play();
                clearInterval(streamInterval);
                return;
            }
        })
    }

}, 2000)()



$(function(){
        $("html,body").stop(true,true).animate({scrollTop:0},1000);
        $('#plane1').on('webkitAnimationEnd',function(){
            $('#pageImg2').addClass('pageImgAni');  //第二个格子亮
            $('#plane2').addClass('plane2Ani');     //第二个飞机飞入
        })
        $('#plane2').on('webkitAnimationEnd',function(){
            $('#dialog1').addClass('dialogAni');  //第一个对话框显示
            //$('#dialog1_audio')[0].play();  
            audioPlay('dialog1_audio')
            $('#pageImg3').addClass('pageImgAni'); //第三个格子亮
            $('#plane3').addClass('plane3Ani');     //第三个飞机淡出
        })
        
        $('#plane3').on('webkitAnimationEnd',function(){
            $('#dialog2').addClass('dialogAni');//第二个对话框显示
            //$('#dialog2_audio')[0].play(); 
            audioPlay('dialog2_audio')
            $('#fire').addClass('fireAni');    
            setTimeout(function(){
                //$('#audio_fire')[0].play();  //战舰开火
                audioPlay('audio_fire')
            },2000);
        })
        $('#fire').on('webkitAnimationEnd',function(){
            $('#pageImg4').addClass('pageImgAni'); //第四个格子亮
            $('#spray').addClass('sprayAni');   //水花渐入
            setTimeout(function(){
                //$('#audio_water')[0].play();  //战舰开火
                audioPlay('audio_water')
            },1000);
        })
        $('#spray').on('webkitAnimationEnd',function(){
            $('#pageImg5').addClass('pageImgAni'); //第五个格子亮
            $('#dunker').addClass('dunkerAni');   //潜艇淡入        
        })
        $('#dunker').on('webkitAnimationEnd',function(){
            $('#water_fire').addClass('fireAni')  //水下炮火
        })
        $('#water_fire').on('webkitAnimationEnd',function(){
            showScroll();
            $('#dialog3').addClass('dialogAni');//第三个对话框显示
            //$('#dialog3_audio')[0].play(); 
            audioPlay('dialog3_audio')
        })
        $('#dialog3').on('webkitAnimationEnd',function(){
            $('#pageBottom').addClass('boardAni');
            $('#rudder').addClass('rudderAni');  //船舵动
            $('#pointerImg').addClass('pointerAni');  //指针动
        })
        $('#pointerImg').on('webkitAnimationEnd',function(){
            $('#pointerImg').addClass('pointerAni1');  //指针循环动              
        })
        var srcEl = $('#pageBottom');
        var oBtn=srcEl.find('.btn');
        srcEl[0].addEventListener('touchstart', function(event) {
            //dualtouchstart 双指操作
            oBtn.addClass('btn_active');
            $('.wrap-slide').hide();
            $('#videoWrap').show();
            //$('#h5video')[0].play();   
           videoPlay('h5video');     
        }, false);
        document.body.addEventListener('touchmove', function(e) {
            e.preventDefault();
            return false;
        }, false);
})
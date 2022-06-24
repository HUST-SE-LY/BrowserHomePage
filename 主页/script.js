if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href)
}

//获取必要组件
let search_box = document.querySelector(".search_box");
let body = document.getElementById("body");
let img = document.querySelector(".search_img");
let bing = document.querySelector(".bing");
let google = document.querySelector(".google");
let form = document.querySelector(".search");
let time = document.querySelector(".time");
let date = new Date();
let hour = date.getHours();
let min = date.getMinutes();
let logo = document.querySelector(".logo");
let mark1 = document.querySelector(".mark1");
let mark2 = document.querySelector(".mark2");
let mark3 = document.querySelector(".mark3");
let aside = document.querySelector(".aside");
let aside_input = document.querySelector(".target_input");
let del_but = document.querySelectorAll(".delete");
let p = document.querySelectorAll(".p");
let arrow1 = document.querySelector(".arrow_mark1");
let arrow2 = document.querySelector(".arrow_mark2");
let arrow3 = document.querySelector(".arrow_mark3");
let pause = document.querySelector(".pause");
let next = document.querySelector(".next");
let last = document.querySelector(".last");
let bottom = document.querySelector(".bottom");
let audio = document.querySelector(".audio");
let music_name = document.querySelector(".music_name");
let normal = document.querySelector(".normal");
let loop = document.querySelector(".loop");
let random = document.querySelector(".random");
let music_list = document.querySelector(".music_list");
let music_time = document.querySelector(".music_time");
let volume_ball = document.querySelector(".volume_ball");
let volume_button = document.querySelector(".volume");
let volume_list = document.querySelector(".volume_list");
let volume_img = document.querySelector(".volume_img");
let link_aside = document.querySelector(".link_aside");
let link_add_button = document.querySelector(".add_link");
let loading_ball = document.querySelector(".loading_ball");
let list = []
let i = 0;//控制图标栏上拉下拉
let j = 0;//控制任务栏左拉右拉
let k = 0;//控制播放栏上拉下拉
let x = 0;//控制暂停播放按钮
let y = 0;//控制播放顺序
let y1;
let z = 0;//设置获取列表
let normal_state = 1;//初始为顺序播放
let loop_state = null;
let random_state = null;
let list_array = new Array();//记忆已经播放的列表
let list_num = 0;//标记歌曲在记忆列表中的位置
let music_p;
let n = 0;//控制歌单栏的拉取
let volume_on = 0;//控制音量栏的拉取
let table = document.querySelectorAll(".table_link");
let menu = document.querySelector(".menu");
let i_delete;

//设置时钟
if (hour < 10) {
    hour = "0" + hour;
}
if (min < 10) {
    min = "0" + min;
}
time.innerHTML = hour + ":" + min;

//搜索框点击边长
search_box.addEventListener("click", (e) => {
    search_box.style.width = "50vw";
    search_box.style.left = "25vw";
    img.style.left = "20vw";
    e.stopPropagation();
})

//点击其他地方搜索框等回到原长度
body.addEventListener("click", () => {
    search_box.style.width = "15vw";
    search_box.style.left = "42.5vw";
    img.style.left = "37.5vw";
    img.style.height = "5vh";
    aside_input.style.width = "5vw";
    link_aside.style.opacity = "0%";
    link_aside.style.display = "none";
    menu.style.display = "none"

})

//点击搜索引擎条变长
img.addEventListener("click", (e) => {
    img.style.height = "10vh";
    e.stopPropagation();
})
//换为谷歌搜索引擎
google.addEventListener("click", () => {
    img.appendChild(bing);
    form.action = "https://google.com.hk/search";
})
//换为必应搜索引擎
bing.addEventListener("click", () => {
    img.appendChild(google);
    form.action = "https://cn.bing.com/search";
})
//图标栏下拉
mark1.addEventListener("click", (e) => {
    if (i % 2 == 0) {
        arrow1.style.transform = "rotate(90deg)"
        logo.style.height = "20vw";
        i++;

    } else {
        arrow1.style.transform = "rotate(-90deg)"
        logo.style.height = "10vw";
        i++;
    }
})
//任务栏左拉
mark2.addEventListener("click", () => {
    if (j % 2 == 0) {
        arrow2.style.transform = "rotate(180deg)"
        aside.style.right = "0";
        j++;
    } else {
        arrow2.style.transform = "rotate(0deg)"
        aside.style.right = "-21vw";
        j++;
    }
})
//任务栏添加时文本框变长
aside_input.addEventListener("click", (e) => {
    aside_input.style.width = "15vw";
    e.stopPropagation()
})
//点击删除按钮，发送请求到服务器端，删除内容并刷新页面
for (let i = 0; i < del_but.length; i++) {
    del_but[i].addEventListener("click", () => {
        p[i].style.textDecoration = "line-through";
        axios.post("/delete", {delete_num: i}).then(res => {
            window.location.replace("");
        })

    })
}
//播放栏上拉
mark3.addEventListener("click", () => {
    if (k % 2 == 0) {
        arrow3.style.transform = "rotate(270deg)"
        bottom.style.bottom = "0";
        k++;
    } else {
        arrow3.style.transform = "rotate(90deg)"
        bottom.style.bottom = "-10vh";
        k++;
    }
})
//点击播放按钮事件
pause.addEventListener("click", () => {
    if (z == 0) {
        list_array.push(0);
        z++;
        axios.get("/music").then((res) => {
            list = res.data;
            audio.src = "http://127.0.0.1:8080/html/music/" + list[y];
            let string = list[y].replace("html/music/", "").replace(".m4a", "").replace(".mp3", "");
            music_name.innerHTML = string;
            audio.play();
            for (let m = 0; m < list.length; m++) {
                let content = "<p class='music_p'>" + list[m].replace("html/music/", "").replace(".m4a", "").replace(".mp3", "") + "</p>";
                music_list.innerHTML += content;
            }
            music_p = document.querySelectorAll(".music_p");
            for (let i = 0; i < music_p.length; i++) {
                music_p[i].addEventListener("click", () => {
                    y = i;
                    audio.src = "html/music/" + list[y];
                    audio.play();
                    let string = list[y].replace("html/music/", "").replace(".m4a", "").replace(".mp3", "");
                    music_name.innerHTML = string;
                    pause.innerHTML = `<img src="html/image/pause-free-icon-font%20(1).png" class="player_img pause_img">`
                    if (x % 2 == 0) {
                        x++;
                    }

                })
            }
            audio.addEventListener("durationchange", () => {
                music_time.innerHTML = time_change(audio.duration);
            })
        })
    }
    if (x % 2 == 0) {
        pause.innerHTML = `<img src="html/image/pause-free-icon-font%20(1).png" class="player_img pause_img">`;
        x++;
        audio.play();
    } else {
        pause.innerHTML = `<img src="html/image/play-free-icon-font%20(1).png" class="player_img pause_img">`;
        x++;
        audio.pause();
    }

})
//点击下一首
next.addEventListener("click", () => {
    if (z != 0) {
        if (list_array.length - 1 == list_num) {//已经到了记忆列表最前端，就不再读取记忆，直接添加歌曲
            if (normal_state == 1 || loop_state == 1) {
                y++;
                if (y == list.length) {
                    y = 0;
                }
                audio.src = "html/music/" + list[y];
                let string = list[y].replace(".m4a", "").replace(".mp3", "");
                music_name.innerHTML = string;
                audio.play();

            }
            if (random_state == 1) {
                do {
                    y1 = Math.floor(list.length * Math.random());
                } while (y == y1);
                y = y1;
                audio.src = "html/music/" + list[y];
                audio.play();
                let string = list[y].replace(".m4a", "").replace(".mp3", "");
                music_name.innerHTML = string;
            }
            list_array.push(y);
            list_num++;
        } else {//此时处于记忆列表中，继续读取记忆列表
            y = list_array[list_num + 1];
            audio.src = "html/music/" + list[y];
            let string = list[y].replace(".m4a", "").replace(".mp3", "");
            music_name.innerHTML = string;
            audio.play();
            list_num++;
        }
        pause.innerHTML = `<img src="html/image/pause-free-icon-font%20(1).png" class="player_img pause_img">`
        if (x % 2 == 0) {
            x++;
        }
    }


})
//点击上一首
last.addEventListener("click", () => {
    if (z != 0) {
        if (list_num == 0) {//已经到了听过的歌曲的第一首，此时在记忆列表最开始添加歌曲
            if (normal_state == 1 || loop_state == 1) {
                y--;
                if (y == -1) {
                    y = list.length - 1;
                }
                audio.src = "html/music/" + list[y];
                let string = list[y].replace(".m4a", "").replace(".mp3", "");
                music_name.innerHTML = string;
                audio.play();
            }
            if (random_state == 1) {
                do {
                    y1 = Math.floor(list.length * Math.random());
                } while (y == y1);
                y = y1;
                audio.src = "html/music/" + list[y];
                audio.play();
                let string = list[y].replace(".m4a", "").replace(".mp3", "");
                music_name.innerHTML = string;
            }
            list_array.unshift(y);
        } else {
            y = list_array[list_num - 1];
            audio.src = "html/music/" + list[y];
            let string = list[y].replace(".m4a", "").replace(".mp3", "");
            music_name.innerHTML = string;
            audio.play();
            list_num--;
        }
        pause.innerHTML = `<img src="html/image/pause-free-icon-font%20(1).png" class="player_img pause_img">`
        if (x % 2 == 0) {
            x++;
        }

    }


})
//歌曲结束时列表循环/单曲循环/随机播放
audio.addEventListener("ended", () => {
    if (list_array.length - 1 == list_num) {
        if (normal_state == 1) {
            y++;
            if (y == list.length) {
                y = 0;
            }
            audio.src = "html/music/" + list[y];
            let string = list[y].replace(".m4a", "").replace(".mp3", "");
            music_name.innerHTML = string;
            audio.play();
        }
        if (loop_state == 1) {
            audio.play();

        }
        if (random_state == 1) {
            do {
                y1 = Math.floor(list.length * Math.random());
            } while (y == y1);
            y = y1;
            audio.src = "html/music/" + list[y];
            audio.play();
            let string = list[y].replace(".m4a", "").replace(".mp3", "");
            music_name.innerHTML = string;

        }
        list_array.push(y);
        list_num++;
    } else {
        if (loop_state == 1) {
            audio.play();
        } else {
            y = list_array[list_num + 1];
            audio.src = "html/music/" + list[y];
            let string = list[y].replace(".m4a", "").replace(".mp3", "");
            music_name.innerHTML = string;
            if (x % 2 == 1) {
                audio.play();
            }
            list_num++;
        }

    }

})
//列表循环按钮
normal.addEventListener("click", () => {
    loop_state = null;
    random_state = null;
    normal_state = 1;
    normal.style.boxShadow = `inset 0.5vh 0.5vh 1vh #cdd4d9, inset -0.5vh -0.5vh 1vh #ffffff`;
    loop.style.boxShadow = `0.4vh 0.4vh 0.5vh #cdd4d9, -0.4vh -0.4vh 0.5vh #ffffff`;
    random.style.boxShadow = `0.4vh 0.4vh 0.5vh #cdd4d9, -0.4vh -0.4vh 0.5vh #ffffff`;
})
//单曲循环按钮
loop.addEventListener("click", () => {
    loop_state = 1;
    random_state = null;
    normal_state = null;
    loop.style.boxShadow = `inset 0.5vh 0.5vh 1vh #cdd4d9, inset -0.5vh -0.5vh 1vh #ffffff`;
    normal.style.boxShadow = `0.4vh 0.4vh 0.5vh #cdd4d9, -0.4vh -0.4vh 0.5vh #ffffff`;
    random.style.boxShadow = `0.4vh 0.4vh 0.5vh #cdd4d9, -0.4vh -0.4vh 0.5vh #ffffff`;
})
//随机播放按钮
random.addEventListener("click", () => {
    loop_state = null;
    random_state = 1;
    normal_state = null;
    random.style.boxShadow = `inset 0.5vh 0.5vh 1vh #cdd4d9, inset -0.5vh -0.5vh 1vh #ffffff`;
    normal.style.boxShadow = `0.4vh 0.4vh 0.5vh #cdd4d9, -0.4vh -0.4vh 0.5vh #ffffff`;
    loop.style.boxShadow = `0.4vh 0.4vh 0.5vh #cdd4d9, -0.4vh -0.4vh 0.5vh #ffffff`;
})
//
music_name.addEventListener("click", (e) => {
    if (n % 2 == 0) {
        music_list.style.bottom = "10vh";
        music_list.style.zIndex = "-999999999";
        setTimeout(() => {
            music_list.style.zIndex = "0";
        }, 300)
        e.stopPropagation();
        n++
    } else {
        music_list.style.bottom = "-40vh";
        music_list.style.zIndex = "-999999999";
        n++;

    }

})

//
function time_change(time) {
    let minute = Math.floor(time / 60);
    let second = parseInt((time - minute * 60).toString());
    if (second < 10) {
        second = "0" + second;
    }
    return minute + ":" + second;

}

volume_ball.onmousedown = () => {
    document.onmousemove = (e) => {
        if (k % 2 == 0) {
            volume_ball.style.bottom = (document.documentElement.clientHeight - e.clientY) + "px";
            if (document.documentElement.clientHeight - e.clientY < 0) {
                volume_ball.style.bottom = "0px";
                volume_img.src = "html/image/声音静音.png";
                audio.volume = 0;
            } else if (parseFloat(volume_ball.style.bottom) / document.documentElement.clientHeight <= 0.19) {
                volume_img.src = "html/image/声音开.png";
                audio.volume = (parseFloat(volume_ball.style.bottom) / document.documentElement.clientHeight) / 0.19;
            } else if (parseFloat(volume_ball.style.bottom) / document.documentElement.clientHeight > 0.19) {
                volume_ball.style.bottom = "19vh";
                audio.volume = 1;
            }
        } else {
            volume_ball.style.bottom = (0.9 * document.documentElement.clientHeight - e.clientY) + "px";
            if (0.9 * document.documentElement.clientHeight - e.clientY < 0) {
                volume_ball.style.bottom = "0px";
                volume_img.src = "html/image/声音静音.png";
                audio.volume = 0;
            } else if (parseFloat(volume_ball.style.bottom) / document.documentElement.clientHeight <= 0.19) {
                volume_img.src = "html/image/声音开.png";
                audio.volume = (parseFloat(volume_ball.style.bottom) / document.documentElement.clientHeight) / 0.19;

            }
            if (parseFloat(volume_ball.style.bottom) / document.documentElement.clientHeight > 0.19) {
                volume_ball.style.bottom = "19vh";
                audio.volume = 1;
            }

        }
    }
    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        document.onmousedown = null;
    }
    return false;
}
volume_button.addEventListener("click", (e) => {
    if (volume_on % 2 == 0) {
        volume_on++;
        volume_button.style.boxShadow = `inset 0.5vh 0.5vh 1vh #cdd4d9, inset -0.5vh -0.5vh 1vh #ffffff`;
        volume_list.style.bottom = "10vh";
        volume_list.style.zIndex = "-999999999";
        volume_ball.style.bottom = (0.2 * document.documentElement.clientHeight * audio.volume) + "px";
        setTimeout(() => {
            volume_list.style.zIndex = "0";
        }, 300)
        e.stopPropagation();

    } else {
        volume_button.style.boxShadow = `0.4vh 0.4vh 0.5vh #cdd4d9, -0.4vh -0.4vh 0.5vh #ffffff`
        volume_on++;
        volume_list.style.bottom = "-21vh";
        volume_list.style.zIndex = "-999999999";
    }
})

function process() {
    console.log("ok")
    let time1 = audio.currentTime;
    let time2 = audio.duration;
    loading_ball.style.left = (time1 / time2) * (0.2 * document.documentElement.clientWidth - 0.02 * document.documentElement.clientHeight) + "px";
}

audio.addEventListener("play", () => {
    setInterval(process, 1000);
})
//
link_add_button.addEventListener("click", (e) => {
    link_aside.style.opacity = "100%";
    link_aside.style.display = "block";
    e.stopPropagation();
})
link_aside.addEventListener("click", (e) => {
    e.stopPropagation()
})

for (let i = 0; i < table.length; i++) {
    table[i].addEventListener("contextmenu", (e) => {
        e.preventDefault();
        e.stopPropagation();
        let x = e.clientX;
        let y = e.clientY;
        menu.style.left = x + "px";
        menu.style.top = y + "px";
        menu.style.display = "block";
        i_delete = i;
    })
}

menu.addEventListener("click", (e) => {
    e.stopPropagation();
    axios.post("/delete_link", {del_i: i_delete}).then(res => {
        window.location.replace("");
    })
})










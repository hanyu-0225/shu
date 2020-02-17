var img = new Image();
img.src = 'name.png';
class Enemy {
	constructor(x, y, angle, kind) {
		this.kind = kind;
		this.BULLET_NUM = 3;
		this.bullet = Array(this.BULLET_NUM);
		for(var i = 0;i < 5;i++) {
			this.bullet[i] = new Bullet();
		}
		this.x = x;
		this.y = y;
		this.width = 32; 
		this.height = 32;
		this.angle = angle;
		this.spd = 3;
		this.cnt = 0;
	}
     getBulletNum() {
		for(var i = 0;i < this.BULLET_NUM;i++) {
			if(!this.bullet[i].exist) {
				return i;
			}
		}
		return -1;
	}
	shot() {
		if(this.cnt % 20 == 0) {
			var num = this.getBulletNum();
			if(num != -1) {
				this.bullet[num].enter(this.x, this.y, 4, 4, this.angle, 5);
			}
		}
		for(var i = 0;i < this.BULLET_NUM;i++) {
			if(this.bullet[i].exist) {
				this.bullet[i].move();
			}
		}
		this.cnt++;
    }
    move() {
		this.x += Math.cos(this.angle) * this.spd;
		this.y += Math.sin(this.angle) * this.spd;
		if(this.x < this.width / 2 || this.x > WIDTH - this.width / 2) {
			var r = this.angle - Math.PI / 2;
			this.angle = this.angle - 2 * r;
			this.spd *= 1.002;
		}
		else if(this.y < this.height / 2 || this.y > HEIGHT - this.height / 2) {
			var r = this.angle - Math.PI * 2;
			this.angle = this.angle - 2 * r;
			this.spd *= 1.002;
		}
	}
    draw(context) {
		switch(this.kind) {
			case 0: context.fillStyle = "rgb(255,0,255)"; break; // 水色
			case 1: context.fillStyle = "rgb(0, 255, 0)"; break; // 緑色
			case 2: context.fillStyle = "rgb(255, 255, 0)"; break; // 黄色
		}
		context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
for(var i = 0;i < this.BULLET_NUM;i++) {
    if(this.bullet[i].exist) {
        this.bullet[i].draw(context);
    }
}
    }
}
class Bullet {
	constructor() {
		this.exist = false;
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		this.angle = 0;
		this.spd = 0;
	}
    enter(x, y, width, height, angle, spd) {
		this.exist = true;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.angle = angle;
		this.spd = spd;
	}
    move() {
		this.x += Math.cos(this.angle) * this.spd;
		this.y += Math.sin(this.angle) * this.spd;
		if(this.x < 0 || this.x > WIDTH || this.y < 0 || this.y > HEIGHT) {
			this.exist = false;
		}
    }
    draw(context) {
		context.fillStyle = "rgb(255, 255, 255);";
		context.fillRect(this.x - (this.width / 2), this.y - (this.height / 2), this.width, this.height);
	}
}
class Player {
	constructor() {
        this.BULLET_NUM = 5;
		this.bullet = Array(this.BULLET_NUM);
		for(var i = 0;i < this.BULLET_NUM;i++) {
			this.bullet[i] = new Bullet();
		}
        this.cnt = 0;
        this.residue = 3;
        this.deffect = false;
		this.x = WIDTH / 2;
		this.y = HEIGHT * 3 / 4;
		this.width = 24;
		this.height = 36;
	} 
    getBulletNum() {
		for(var i = 0;i < this.BULLET_NUM;i++) {
			if(!this.bullet[i].exist) {
				return i;
			}
		}
		return -1;
	}
		shot(key) {
		var num;
		if(key[KEY_Z] == 1) {
			num = this.getBulletNum();
			if(num != -1) {
				this.bullet[num].enter(this.x, this.y, 4, 36, -Math.PI / 2, 10);
				key[KEY_Z]++;
			}
		}
    }  
	move(key) {
		var diagonal = 1.0;
		var hori = false, vert = false;
		if(key[KEY_RIGHT] != 0 || key[KEY_LEFT] != 0) {
			hori = true;
		}
		if(key[KEY_UP] != 0 || key[KEY_DOWN] != 0) {
			vert = true;
		}
		if(hori && vert) {
			diagonal = Math.sqrt(2.0);
		}
		var mx = this.x + (key[KEY_RIGHT] - key[KEY_LEFT]) * 6 / diagonal;
		var my = this.y + (key[KEY_DOWN] - key[KEY_UP]) * 6 / diagonal;
		if(!(mx < this.width / 2 || mx > WIDTH - this.width / 2)) {
			this.x = mx;
		}
		if(!(my < this.height / 2 || my > HEIGHT - this.height / 2)) {
			this.y = my;
		}
	}
	draw(context) {
		if(!(this.deffect && this.cnt % 2 == 0)) {
        context.fillStyle = img;
		context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
		for(var i = 0;i < this.BULLET_NUM;i++) {
			if(this.bullet[i].exist) {
				this.bullet[i].move();
				this.bullet[i].draw(context);
			}
		}
		if(this.cnt > 100) {
			this.cnt = 0;
			this.deffect = false;
		}
        this.cnt++;
	}
}

let WIDTH = 800;
let HEIGHT = 600;
var key = Array(5);
let KEY_RIGHT	= 0;
let KEY_LEFT	= 1;
let KEY_UP		= 2;
let KEY_DOWN	= 3;
let KEY_Z		= 4;
key[KEY_RIGHT]	= 0;
key[KEY_LEFT]	= 0;
key[KEY_UP]		= 0;
key[KEY_DOWN]	= 0;
key[KEY_Z]		= 0;
var player = new Player();
let ENEMY_NUM = 8;
var enemy = Array(ENEMY_NUM);
var kind = [1, 0, 0, 0, 2, 0, 0, 1];
for(var i = 0;i < ENEMY_NUM;i++) {
	enemy[i] = new Enemy(WIDTH * (i + 1) / 9, HEIGHT / 4, Math.PI * 5 / 6 - Math.PI * 2 / 3 * i / 7, kind[i]);
}
var canvas;
var context;
canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
var score = 0;
var gameover = false;
var cnt = 0;
requestAnimationFrame(main);
function main() {
	context.fillStyle = img;
	context.clearRect(0, 0, WIDTH, HEIGHT);
	if(!gameover) {
    player.shot(key);
    player.move(key);
	player.draw(context);
    }
    for(var i = 0;i < ENEMY_NUM;i++) {
        enemy[i].shot();
        enemy[i].move();
		enemy[i].draw(context);   }
    if(!gameover) {
	for(var i = 0;i < ENEMY_NUM;i++) {
		if(!player.deffect && Math.abs(player.x - enemy[i].x) < (player.width + enemy[i].width) / 2 &&
			Math.abs(player.y - enemy[i].y) < (player.height + enemy[i].height) / 2) {
			player.cnt = 0;
			player.residue--;
			player.deffect = true;
		}
	}  
	for(var i = 0;i < ENEMY_NUM;i++) {
		for(var j = 0;j < enemy[i].BULLET_NUM;j++) {
			if(enemy[i].bullet[j].exist) {
				if(!player.deffect && Math.abs(player.x - enemy[i].bullet[j].x) < (player.width + enemy[i].bullet[j].width) / 2 &&
					Math.abs(player.y - enemy[i].bullet[j].y) < (player.height + enemy[i].bullet[j].height) / 2) {
					player.cnt = 0;
					player.residue--;
					player.deffect = true;
				}
			}
		}
    }
	for(var i = 0;i < player.BULLET_NUM;i++) {
		if(player.bullet[i].exist) {
			for(var j = 0;j < ENEMY_NUM;j++) {
				if(Math.abs(player.bullet[i].x - enemy[j].x) < (player.bullet[i].width + enemy[j].width) / 2 &&
					Math.abs(player.bullet[i].y - enemy[j].y) < (player.bullet[i].height + enemy[j].height) / 2) {
					enemy[j].x = WIDTH / 12 + Math.random() * WIDTH * 5 / 6;
					enemy[j].y = HEIGHT / 8;
					enemy[j].angle = Math.PI * 2 * Math.random();
                    player.bullet[i].exist = false;
                    switch(enemy[j].kind) {
						case 0: score += 100; break;
						case 1: score += 200; break;
						case 2: score += 300; break;
					}
				}
			}
		}
    }	
	if(player.residue == 0) {
		gameover = true;
		for(var i = 0;i < player.BULLET_NUM;i++) {
			player.bullet[i].exist = false;
		}
	}
	for(var i = 0;i < player.residue;i++) {
		context.fillStyle = "rgb(255, 0, 0)";
		context.fillRect(10 + i * 40, 60, player.width, player.height);
     }
     }
context.font = "bold 20px sans-serif";
context.fillStyle = img;
context.fillText("SCORE: " + score, 10, 40);
if(gameover) {
    context.font = "bold 60px sans-serif";
    context.fillStyle = "rgb(255, 100, 100)";
    context.fillText("! ! GAME OVER ! !", WIDTH / 6, HEIGHT / 2);
    context.font = "bold 40px sans-serif";
    context.fillStyle = "rgba(255, 255, 255, " + (Math.sin(Math.PI * 2 * cnt / 200)) + ")";
    context.fillText("Enter　で　コンティニュー", WIDTH / 6, HEIGHT * 2 / 3);
    cnt++;
    if(cnt == 200) cnt = 0;	
}
requestAnimationFrame(main);
}
document.addEventListener("keydown", e => {
	var keyCode = e.keyCode;
	switch(keyCode) {
		case 39: key[KEY_RIGHT]	= 1; break;
		case 37: key[KEY_LEFT]	= 1; break;
		case 38: key[KEY_UP]	= 1; break;
        case 40: key[KEY_DOWN]	= 1; break;
        case 90: key[KEY_Z]++;		 break;
        case 13:
			if(gameover) {
				gameover = false;
				player.residue = 3;
				player.deffect = false;
				player.x = WIDTH / 2;
				player.y = HEIGHT * 3 / 4;
				score = 0;
				for(var i = 0;i < ENEMY_NUM;i++) {
					enemy[i] = new Enemy(WIDTH * (i + 1) / 9, HEIGHT / 4, Math.PI * 5 / 6 - Math.PI * 2 / 3 * i / 7, kind[i]);
				}
			}
			break;
    }
});
document.addEventListener("keyup", e => {
	var keyCode = e.keyCode;	
	switch(keyCode) {
		case 39: key[KEY_RIGHT]	= 0; break;
		case 37: key[KEY_LEFT]	= 0; break;
		case 38: key[KEY_UP]	= 0; break;
        case 40: key[KEY_DOWN]	= 0; break;
        case 90: key[KEY_Z]		= 0; break;
	}
});
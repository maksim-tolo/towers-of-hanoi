
function Tower(num, width, height, xwidth, dropHandler) {
	this.num = num;
	this.width = width;
	this.height = height;
	this.xwidth = xwidth;
	this.dropHandler = dropHandler;
	this.disks = [];
}

Tower.prototype.getNum = function() {
	return this.num;
};

Tower.prototype.getDisks = function() {
	return this.disks;
};

// returns jquery obj, containing canvas selected by id - done
Tower.prototype.getElement = function() {
	var a = "#tower"+this.num;
	return $(a);
};

// returns jquery obj, containing image of specific tower selected by id - done
Tower.prototype.getImageElement = function() {
	return $("#towerimg");
};

// creates and returns jquery obj, containing canvas elem
// for ex. <canvas class="tower" id="tower1" width="100" height="18" /> - done
Tower.prototype.createElement = function() {
	var a = "#tower"+this.num;
	$("#game").append('<canvas class="tower" id="tower'+this.num+'" />');
	$(a).attr("width", this.width);
	$(a).attr("height", this.height);
	return $(a);
};

// creates and returns jquery obj containing image of a tower - done
// <img id="towerimg1" src="img/tower.gif" />
Tower.prototype.createImageElement = function() {
	$("#images").append('<img id="towerimg" />');
	$("#towerimg").attr("src", "img/tower.gif");
	return $("#towerimg");
};

Tower.prototype.init = function() {
	this.draw();
	this.setDroppable();
};

Tower.prototype.draw = function() {
	this.getImageElement().load($.proxy(this.loadImage, this));
};

Tower.prototype.loadImage = function(event) {
	var elem = this.getElement();
	var ctx = elem.get(0).getContext("2d");
	var img = $(event.target);// assign loaded image jquery obj - done
	ctx.drawImage(img.get(0), (this.width - this.xwidth) / 2, 0, this.xwidth, this.height - this.xwidth);
	ctx.strokeRect((this.width - this.xwidth) / 2, 0, this.xwidth - 1, this.height - this.xwidth - 1);
};

Tower.prototype.setDroppable = function() {
	var img = this.getElement();
	img.droppable({ drop: this.dropHandler });
	// make elem droppable and attach drop handler - done

};

Tower.prototype.addDisk = function(disk) {
	this.disks.push(disk);
};

Tower.prototype.removeDisk = function(disk) {
	this.disks.splice(this.disks.indexOf(disk), 1);
};

Tower.prototype.canPlaceDisk = function(disk) {
	var result = true;
	if (this.disks.length > 0) {
		var topDisk = this.disks[this.disks.length - 1];
		if (topDisk.getNum() < disk.getNum()) {
			result = false;
		}
	}
	return result;
};

Tower.prototype.moveDisk = function(disk) {
	var oldTower = disk.getTower();
	oldTower.removeDisk(disk);
	this.addDisk(disk);
	disk.setTower(this);
};

Tower.prototype.updateDraggableDisks = function() {
	for (var i = 0; i < this.disks.length; i++) {
		this.disks[i].setDraggable(i == this.disks.length - 1);
	}
};

Tower.prototype.calcDiskTop = function(num, height) {
	var result = this.height - this.xwidth;
	for (var i = 0; i < this.disks.length; i++) {
		result -= height;
		if (num == this.disks[i].getNum()) {
			break;
		}
	}
	return result;
};

Tower.prototype.calcDiskLeft = function(width) {
	return this.width * this.num + (this.width - width) / 2;
};
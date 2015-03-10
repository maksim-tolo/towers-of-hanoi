function Disk(num, width, height, dragHandler) {
	this.num = num;
	this.width = width;
	this.height = height;
	this.dragHandler = dragHandler;
	this.tower = null;
}

Disk.prototype.getNum = function() {
	return this.num;
};

Disk.prototype.getTower = function() {
	return this.tower;
};

Disk.prototype.setTower = function(tower) {
	this.tower = tower;
};

// returns jQuery obj containig image element for specific disk, selected by id - done
Disk.prototype.getImageElement = function() {
	var a = "#diskimg"+this.num;
	return $(a);
};

// creates and returns jQuery obj, containing img element
// <img id="diskimg1" src="img/disk1.gif" width="100" height="18" />  - done
Disk.prototype.createImageElement = function() {
	var a = "#diskimg"+this.num;
	var b = "img/disk"+this.num+".gif";
	$("#game").append('<img id="diskimg'+this.num+'" />');
	$(a).attr("src", b)
		.attr("width", this.width)
		.attr("height", this.height);
	return $(a);
};

Disk.prototype.init = function() {
	this.setDraggable(true);
};

Disk.prototype.setDraggable = function(enabled) {
	var elem = this.getImageElement();
	if (enabled) {
		elem.draggable({ drag: this.dragHandler });
	}
	else {
		if (elem.hasClass("ui-draggable")) {
			elem.draggable("destroy");
		}
	}
	// if enabled make elem daraggable and attach drag handler
	// else remove the draggable functionality completely if elem is draggable. - done


};

Disk.prototype.setDraggableRevert = function(enabled) {
	var img = this.getImageElement();
	img.draggable("option", "revert", enabled);
	// enable revert option for img to return it on prev position, if img don't hover a tower

};

Disk.prototype.position = function() {
	var elem = this.getImageElement();
	var top = this.tower.calcDiskTop(this.num, this.height);
	var left = this.tower.calcDiskLeft(this.width);
	elem.css("top", top)
		.css("left", left)
		.css("position", "absolute");

	// set here absolute position for the elem - done

};
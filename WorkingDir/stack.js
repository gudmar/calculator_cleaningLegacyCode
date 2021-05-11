class Stack {
	constructor() {
		this.node = {
			next: null,
			value: undefined
		}
	}
	push(_value) {
		if (this.peep() === undefined && this._getNext() === null) {
			this.node.value = _value
		} else {
			let tempNode = this._getNewNode(_value, this.node);
			this.node = tempNode;
		}
	}
	pop() {
		if (this.node.next == null) {
			let tempValue = this.node.value;
			this.node.value = undefined;
			return tempValue
		}
		let tempNode = this.node;
		this.node = this.node.next;
		return tempNode.value
	}
	isEmpty() {
		return (this.peep() === undefined && this._getNext() === null) ? true : false;
	}
	peep() {
		return this.node.value
	}
	_getNext() {
		return this.node.next
	}
	_getNewNode(_value, _next) {
		return {
			next: _next,
			value: _value
		}
	}
}
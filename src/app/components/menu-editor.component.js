import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import EventListener from 'react-event-listener';
import { Segment, Divider, Dimmer, Loader } from 'semantic-ui-react'
import MenuItemToolBox from './menu-item-toolbox.component';
import { saveMenuData } from '../$actions/menus.actions';


@connect((store) => {
    return {
        menus: store.menus.menus,
        currentMenuId: store.menus.currentMenuId,
        currentMenuDataLoading: store.menus.currentMenuDataLoading,
        currentMenuData: store.menus.currentMenuData
    }
})
export default class MenuEditor extends React.Component {
    constructor() {
        super();
        this.stateV = 0;
    }

    componentDidMount() {
        this.main = ReactDOM.findDOMNode(this).parentNode;
        this.root = ReactDOM.findDOMNode(this).parentNode.parentNode.parentNode;
    }

    componentDidUpdate() {
        this.orderMenu();
    }

    setReferences() {
        if(!this.props.currentMenuData) {
            return;
        }
        this._refs = [];
        this.props.currentMenuData.forEach((item, index) => {

            this._refs[index] = {};
            this._refs[index].item = item;

            let selector = 'li-' + item.ID;
            this._refs[index][selector] = {};
            this._refs[index][selector].ref = React.createRef();

            selector = 'ul-' + item.ID;
            this._refs[index][selector] = {};
            this._refs[index][selector].ref = React.createRef();

            selector = 'span-insert-child-' + item.ID;
            this._refs[index][selector] = {};
            this._refs[index][selector].ref = React.createRef();

            selector = 'li-insert-after-' + item.ID;
            this._refs[index][selector] = {};
            this._refs[index][selector].ref = React.createRef();

            selector = 'span-insert-after-' + item.ID;
            this._refs[index][selector] = {};
            this._refs[index][selector].ref = React.createRef();

            selector = 'li-insert-before-' + item.ID;
            this._refs[index][selector] = {};
            this._refs[index][selector].ref = React.createRef();

            selector = 'span-insert-before-' + item.ID;
            this._refs[index][selector] = {};
            this._refs[index][selector].ref = React.createRef();
        });
    }

    render() {
        this.stateV ++;
        this.setReferences();
        return (
            <Segment raised key={'v' + this.stateV} className="menu-editor">
            {this.props.currentMenuId &&
              <h5>Site Tree ({ this.props.menus.find(menu => {
                  return menu.term_id === this.props.currentMenuId;
              }).name})</h5>
            }
              <Divider />
              {this.props.currentMenuDataLoading &&
                <Dimmer active inverted>
                    <Loader inverted></Loader>
                </Dimmer>

              }
              {!this.props.currentMenuDataLoading && this._refs &&
              <ul id="menu-editor-ul" key="menu-editor-ul">
                {this._refs.map((item, index) =>
                    <React.Fragment key={'fragment' + item.item.ID}>
                    { index===0 &&
                        <li className="menu-item"
                            ref={item['li-insert-before-' + item.item.ID].ref}
                            id={'li-insert-before-' + item.item.ID}
                            key={'li-insert-before-' + item.item.ID}
                        >
                            <span className="menu-item--insert menu-item--insert-before"
                                ref={item['span-insert-before-' + item.item.ID].ref}
                                id={'span-insert-before-' + item.item.ID}
                                key={'span-insert-before-' + item.item.ID}
                                data-el={'li-' + item.item.ID}
                                data-id={item.item.ID}
                            ></span>
                        </li>
                    }
                        <li className="menu-item menu-item-main"
                            ref={item['li-' + item.item.ID].ref}
                            id={'li-' + item.item.ID}
                            key={'li-' + item.item.ID}
                            data-id={item.item.ID}
                        >
                            <Segment className="menu-item-segment"
                                     secondary
                                     id={'menu-item-segment' + item.item.ID}
                                     key={'menu-item-segment' + item.item.ID}
                                >
                                <div className="menu-item-segment-content"
                                    id={'menu-item-segment-content' + item.item.ID}
                                    key={'menu-item-segment-content' + item.item.ID}
                                >
                                    <span className="menu-item-bar">{item.item.title}</span>
                                    <MenuItemToolBox
                                        itemId={item.item.ID}
                                        key={'MenuItemToolBox' + item.item.ID}
                                    />
                                </div>
                            </Segment>
                            <span className="menu-item--insert menu-item--insert-child"
                                ref={item['span-insert-child-' + item.item.ID].ref}
                                id={'span-insert-child-' + item.item.ID}
                                key={'span-insert-child-' + item.item.ID}
                                data-el={'li-' + item.item.ID}
                            ></span>
                            <ul ref={item['ul-' + item.item.ID].ref}
                                id={'ul-' + item.item.ID}
                                key={'ul-' + item.item.ID}
                                data-id={item.item.ID}
                            >
                            </ul>
                        </li>
                        <li className="menu-item"
                            ref={item['li-insert-after-' + item.item.ID].ref}
                            id={'li-insert-after-' + item.item.ID}
                            key={'li-insert-after-' + item.item.ID}
                        >
                            <span className="menu-item--insert menu-item--insert-after"
                                ref={item['span-insert-after-' + item.item.ID].ref}
                                id={'span-insert-after-' + item.item.ID}
                                key={'span-insert-after-' + item.item.ID}
                                data-el={'li-' + item.item.ID}
                                data-id={item.item.ID}
                            ></span>
                        </li>
                    </React.Fragment>)}
                </ul>}
                <EventListener target={document} onMouseDownCapture={this.handleMouseDown.bind(this)} />
                <EventListener target={document} onMouseMoveCapture={this.handleMouseMove.bind(this)} />
                <EventListener target={document} onMouseUpCapture={this.handleMouseUp.bind(this)} />
            </Segment>
        );
    }

    orderMenu() {
        this._refs.forEach((item) => {
            let _child = this.getElementRef('li-' + item.item.ID);
            let _parent;
            if (item.item.menu_item_parent !== '0') {
                _parent = this.getElementRef('ul-' + item.item.menu_item_parent);
            }
            let insertAfter = this.getElementRef('li-insert-after-' + item.item.ID);
            if (_parent && _child) {
                _parent.appendChild(_child);
                _child.after(insertAfter);

            }
        });
    }

    saveMenu(menuId, data) {
        this.props.dispatch(saveMenuData(menuId, data));
    }

    handleMouseDown(e) {
        if (e.target.className === 'menu-item-bar') {
            this.onDragStart(e);
        }
    }

    handleMouseMove(e) {
        if (this.dragStart && this.draggedClone) {
            this.onDragging(e, this.draggedClone);
        }
    }

    handleMouseUp(e) {
        this.onDragEnd();
    }

    onDragStart(e) {
        this.dragStart = true;
        const draggedId = e.target.parentNode.parentNode.parentNode.getAttribute('id')
        this.dragged = this.getElementRef(draggedId);
        this.dragOffset = this.getDragOffset(e);
        this.draggedClone = this.dragged.cloneNode(true);
        this.addClass(this.root, 'drag');
        this.addClass(this.draggedClone, 'drag');
        this.addClass(this.draggedClone, 'clone');
        this.addClass(this.dragged, 'freeze');
        this.dragged.parentNode.appendChild(this.draggedClone);
        this.onDragging(e, this.draggedClone);
    }

    onDragging(e, el) {
        let mouse = this.getMousePosition(e);
        el.style.left = mouse.left - this.dragOffset.left + 'px';
        el.style.top = mouse.top - this.dragOffset.top + 'px';
        let elRect = el.getBoundingClientRect();

        this.hitted = this.hitTest({
                top: elRect.top,
                left: elRect.left,
                width: elRect.width,
                height: 32
            },
            this.getElementDOM('.menu-item--insert')
        );

        this.removeClass(this.getElementDOM('.menu-item--insert'), 'hover');
        this.insertHere = null;

        if (this.hitted.length > 0) {

            this.insertHere = this.getNerest({
                top: elRect.top,
                left: elRect.left
            }, this.hitted);

            if (this.insertHere) {
                this.addClass(this.getElementRef(this.insertHere.id), 'hover');
            }
        }
    }

    onDragEnd() {
        if (!this.dragged) {
            return;
        }

        if (this.insertHere) {
            this.drop(this.getElementRef(this.insertHere.id), this.dragged);
        } else {
            this.clearAfterDrag();
        }
    }

    drop(insert, dragged) {
        this.dropElement = this.getElementRef(insert.getAttribute('data-el'));

        this.nextCurrentMenuData = this.toJS(this.props.currentMenuData);

        if (insert.id.indexOf('after') !== -1) {
            this.insertItemAfter(this.dropElement, dragged);
        }

        if (insert.id.indexOf('child') !== -1) {
            this.insertItemChild(this.dropElement, dragged);
        }

        if (insert.id.indexOf('before') !== -1) {
            this.insertItemBefore(this.dropElement, dragged);
        }

        this.clearAfterDrag();
        this.changeMenuOrder();


        this.saveMenu(this.props.currentMenuId, this.nextCurrentMenuData);

    }

    insertItemAfter(el_1, el_2) {
        const id1 = el_1.getAttribute('data-id');
        const id2 = el_2.getAttribute('data-id');

        const _after = this.getElementRef('li-insert-after-' + id1)
        _after.after(el_2);
        const insertAfter = this.getElementRef('li-insert-after-' + id2);
        el_2.after(insertAfter);

        let dataItem1 = this.nextCurrentMenuData.find(item => {
            return item.ID.toString() === id1;
        });

        let dataItem2 = this.nextCurrentMenuData.find(item => {
            return item.ID.toString() === id2;
        });

        if (dataItem1.menu_item_parent !== dataItem2.menu_item_parent) {
            dataItem2.menu_item_parent = dataItem1.menu_item_parent;
        }
    }

    insertItemBefore(el_1, el_2) {
        const id1 = el_1.getAttribute('data-id');
        const id2 = el_2.getAttribute('data-id');

        const _before = this.getElementRef('li-insert-before-' + id1)
        _before.before(el_2);

        const insertAfter = this.getElementRef('li-insert-after-' + id2);
        el_2.after(insertAfter);

        let dataItem1 = this.nextCurrentMenuData.find(item => {
            return item.ID.toString() === id1;
        });

        let dataItem2 = this.nextCurrentMenuData.find(item => {
            return item.ID.toString() === id2;
        });

        if (dataItem1.menu_item_parent !== dataItem2.menu_item_parent) {
            dataItem2.menu_item_parent = dataItem1.menu_item_parent;
        }
    }


    insertItemChild(el_1, el_2) {
        const id1 = el_1.getAttribute('data-id');
        const id2 = el_2.getAttribute('data-id');
        const parent = this.getElementRef('ul-' + id1);
        const insertAfter = this.getElementRef('li-insert-after-' + id2);
        parent.prepend(el_2);
        el_2.after(insertAfter);

        this.nextCurrentMenuData.find(i => {
            return i.ID.toString() === id2;
        }).menu_item_parent = id1;
    }

    changeMenuOrder() {
        const menuList = this.getElementDOM('.menu-item-main');
        let nextCurrentMenuDataOrdered = [];
        menuList.forEach((item, index) => {
            const id = item.getAttribute('data-id');

            const currentItem = this.nextCurrentMenuData.find(item => {
                return item.ID.toString() === id;
            });
            currentItem.menu_order = index + 1;
            nextCurrentMenuDataOrdered.push(currentItem);
        });
        this.nextCurrentMenuData = nextCurrentMenuDataOrdered;
    }

    clearAfterDrag() {
        this.removeClass(this.getElementDOM('.menu-item--insert'), 'hover');
        this.removeClass(this.root, 'drag');
        this.removeClass(this.dragged, 'freeze');
        this.dragged.removeAttribute('style');
        this.draggedClone.parentNode.removeChild(this.draggedClone);
        this.draggedClone = null;
        this.dragged = null;
        this.dragStart = false;
    }

    getElementRef(selector) {
        const item = this._refs.find(item => {
            return item[selector];
        });
        if (item[selector]) {
            return item[selector].ref.current;
        }
    }

    getElementDOM(selector) {
        const node = ReactDOM.findDOMNode(this);
        if (node) {
            let el = node.querySelectorAll(selector);
            if (!el) {
                return;
            }
            if (el.length < 2) {
                return el[0];
            }
            return el;
        }
    }

    getDragOffset(e) {
        const rootRect = this.main.getBoundingClientRect();
        const thisRect = ReactDOM.findDOMNode(this).getBoundingClientRect();
        const mouse = this.getMousePosition(e);
        const elRect = this.getElementPosition(e.target);
        return {
            top: thisRect.top,
            left: rootRect.left - (elRect.left - mouse.left)
        };
    }

    getMousePosition(e) {
        return {
            left: e.clientX,
            top: e.clientY
        };
    }

    getElementPosition(el) {
        let elRect = el.getBoundingClientRect();
        return {
            top: elRect.top,
            left: elRect.left
        };
    }

    hasClass(el, className) {
        if (el.classList)
            return el.classList.contains(className)
        else
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    }
    addClass(elements, className) {
        if (elements.length === undefined) {
            elements = [elements];
        }

        elements.forEach(function (el) {
            if (el.classList)
                el.classList.add(className)
            else if (!this.hasClass(el, className)) el.className += " " + className
        });
    }
    removeClass(elements, className) {

        if (elements.length === undefined) {
            elements = [elements];
        }

        elements.forEach(function (el) {
            if (el.classList)
                el.classList.remove(className)
            else if (this.hasClass(el, className)) {
                var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
                el.className = el.className.replace(reg, ' ')
            }
        });
    }


    getNerest(point, elements) {
        let dist = [];
        let els = [];
        elements.forEach(el => {
            const distX = Math.abs(el.left - point.left);
            const distY = Math.abs(el.top - point.top);
            const distXY = distX / distY;
            dist.push(distXY)
            els.push({
                dist: distXY,
                el: el
            });
        });

        dist.sort((a, b) => {
            return a - b;
        });
        const result = els.filter(el => el.dist = dist[0]);
        if (result.length > 0) {
            return result[0].el;
        }
    }

    hitTest(el_a, el_b) {
        const fetchEl = (el) => {

            if (!el.length) {
                el = [el];
            }

            let el_fetched = [];

            el.forEach(item => {
                let itemFetched;
                if (item.nodeName) {
                    itemFetched = item.getBoundingClientRect();
                    const style = getComputedStyle(item);
                    itemFetched.pointerEvents = style.pointerEvents;
                } else {
                    itemFetched = item;
                    if (!item.width) {
                        item.width = 1;
                    }
                    if (!item.height) {
                        item.height = 1;
                    }
                }
                if (item.id) {
                    itemFetched.id = item.id;
                }
                el_fetched.push(itemFetched);
            });
            return el_fetched;
        };

        el_a = fetchEl(el_a);
        el_b = fetchEl(el_b);

        let hitted = [];


        el_a.forEach(item_a => {

            el_b.forEach(item_b => {

                if (item_b.pointerEvents !== 'none') {

                    const a_top = Math.round(item_a.top);
                    const a_left = Math.round(item_a.left);
                    const a_height = Math.round(item_a.height);
                    const a_width = Math.round(item_a.width);

                    const b_top = Math.round(item_b.top);
                    const b_left = Math.round(item_b.left);
                    const b_height = Math.round(item_b.height);
                    const b_width = Math.round(item_b.width);

                    if ((b_top >= a_top && b_top <= a_top + a_height) &&
                        (a_left >= b_left && a_left <= b_left + b_width)
                    ) {
                        hitted.push(item_b);
                    }
                }
            });
        });

        return hitted;
    }

    toJS(data) {
        return JSON.parse(JSON.stringify(data));
    }
}

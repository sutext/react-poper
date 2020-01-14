'use strict';
var __extends =
    (this && this.__extends) ||
    (function() {
        var extendStatics = function(d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function(d, b) {
                        d.__proto__ = b;
                    }) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function(d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
var __assign =
    (this && this.__assign) ||
    function() {
        __assign =
            Object.assign ||
            function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = __importDefault(require('react'));
var react_dom_1 = __importDefault(require('react-dom'));
if (!react_1 || !react_dom_1) {
    throw new Error('react-poper must can only work in react project');
}
const Context = react_1.default.createContext({});
var Modal = (function(_super) {
    __extends(Modal, _super);
    function Modal() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.dismiss = function(finish) {
            if (typeof _this.props.index === 'number') {
                _this.context.pop && _this.context.pop.dismiss(_this.props.index, finish);
            }
        };
        return _this;
    }
    Modal.prototype.modalWillShow = function() {};
    Modal.prototype.modalWillHide = function() {};
    Modal.prototype.modalDidShow = function() {};
    Modal.prototype.modalDidHide = function() {};
    Modal.prototype.modalTapMask = function() {
        this.dismiss();
    };
    Modal.masktap = true;
    Modal.onlyone = true;
    Modal.dimming = -1;
    Modal.fademode = 'all';
    Modal.contextType = Context;
    return Modal;
})(react_1.default.Component);
exports.Modal = Modal;
var Container = /** @class */ (function(_super) {
    __extends(Container, _super);
    function Container() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.state = { modals: [] };
        return _this;
    }
    Object.defineProperty(Container.prototype, 'count', {
        get: function() {
            return this.state.modals.length;
        },
        enumerable: true,
        configurable: true,
    });
    Container.prototype.addModal = function(meta, metaProps, finish) {
        var _this = this;
        if (meta.onlyone) {
            var index_1 = this.state.modals.findIndex(function(ele) {
                return ele.meta === meta;
            });
            if (index_1 >= 0) {
                finish();
                return;
            }
        }
        var modals = this.state.modals.concat();
        var index = modals.push({ metaProps: metaProps, meta: meta }) - 1;
        this.setState({ modals: modals }, function() {
            var ins = _this.refs[index];
            ins.show().then(finish);
        });
    };
    Container.prototype.delModal = function(meta, finish) {
        var _this = this;
        var modals = this.state.modals.concat();
        var promises = [];
        for (var index = modals.length - 1; index >= 0; index--) {
            if (modals[index].meta === meta) {
                var ins = this.refs[index];
                promises.push(ins.hide());
                modals.splice(index, 1);
            }
        }
        if (promises.length > 0) {
            Promise.all(promises).then(function() {
                _this.setState({ modals: modals }, finish);
            });
        } else {
            finish();
        }
    };
    Container.prototype.delIndex = function(index, onhide) {
        var _this = this;
        var ins = this.refs[index + ''];
        if (ins) {
            ins.hide().then(function() {
                var modals = _this.state.modals.concat();
                modals.splice(index, 1);
                _this.setState({ modals: modals }, onhide);
            });
        } else {
            onhide();
        }
        onhide();
    };
    Container.prototype.clear = function() {
        this.setState({ modals: [] });
    };
    Container.prototype.render = function() {
        return this.state.modals.map(function(prop, idx) {
            return react_1.default.createElement(Wrapper, __assign({ ref: idx + '', key: idx }, prop, { index: idx }));
        });
    };
    return Container;
})(react_1.default.Component);
var Wrapper = /** @class */ (function(_super) {
    __extends(Wrapper, _super);
    function Wrapper() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.state = { display: undefined };
        _this.modal = null;
        return _this;
    }
    Wrapper.prototype.onAniFinish = function(event) {
        if (event.propertyName == 'background-color' && this.state.display) {
            if (this.state.display) {
                if (this.onshow) {
                    this.onshow();
                    this.onshow = undefined;
                    if (this.modal) {
                        if (this.modal.props.onshow) {
                            this.modal.props.onshow();
                        }
                        this.modal.modalDidShow();
                    }
                }
            } else {
                if (this.onhide) {
                    this.onhide();
                    this.onhide = undefined;
                    if (this.modal) {
                        if (this.modal.props.onhide) {
                            this.modal.props.onhide();
                        }
                        this.modal.modalDidHide();
                    }
                }
            }
        } else if (event.propertyName == 'opacity' && !this.state.display) {
            if (this.onhide) {
                this.onhide();
                this.onhide = undefined;
                if (this.modal) {
                    if (this.modal.props.onhide) {
                        this.modal.props.onhide();
                    }
                    this.modal.modalDidHide();
                }
            }
        }
    };
    Wrapper.prototype.hide = function() {
        var _this = this;
        return new Promise(function(reslove) {
            if (_this.onhide || !_this.state.display) {
                reslove();
                return;
            }
            _this.onhide = reslove;
            setTimeout(function() {
                _this.modal && _this.modal.modalWillHide && _this.modal.modalWillHide();
                return _this.setState({ display: false });
            });
        });
    };
    Wrapper.prototype.show = function() {
        var _this = this;
        return new Promise(function(reslove) {
            if (_this.onshow || _this.state.display) {
                reslove();
                return;
            }
            _this.onshow = reslove;
            setTimeout(function() {
                _this.modal && _this.modal.modalWillShow && _this.modal.modalWillShow();
                return _this.setState({ display: true });
            });
        });
    };
    Wrapper.prototype.onClick = function() {
        if (this.props.meta.masktap) {
            this.modal && this.modal.modalTapMask && this.modal.modalTapMask();
        }
    };
    Wrapper.prototype.render = function() {
        var _this = this;
        var Meta = this.props.meta;
        var props = this.props.metaProps;
        var alpha = Meta.dimming < 0 ? this.context.pop.dimming : Meta.dimming;
        var opacity = 1;
        var color = 'rgba(0,0,0,' + alpha + ')';
        if (this.state.display === undefined) {
            color = 'rgba(0,0,0,0)';
        } else if (this.state.display === false) {
            if (Meta.fademode === 'mask') {
                color = 'rgba(0,0,0,0)';
            } else {
                opacity = 0;
            }
        }
        var style = {
            position: 'fixed',
            width: '100%',
            height: '100%',
            display: 'flex',
            transition: 'all 0.3s linear',
            alignItems: 'center',
            justifyContent: 'center',
            top: '0',
            left: '0',
            opacity: opacity,
            backgroundColor: color,
        };
        return react_1.default.createElement(
            'div',
            {
                style: style,
                onTransitionEnd: function(evt) {
                    return _this.onAniFinish(evt);
                },
                onClick: function() {
                    return _this.onClick();
                },
            },
            react_1.default.createElement(
                Meta,
                __assign({}, props, {
                    index: this.props.index,
                    ref: function(ins) {
                        return (_this.modal = ins);
                    },
                }),
            ),
        );
    };
    Wrapper.contextType = Context;
    return Wrapper;
})(react_1.default.Component);
var Poper = /** @class */ (function() {
    function Poper(config) {
        var _this = this;
        this.opqueue = [];
        this.container = null;
        if (config) {
            this.dimming = config.dimming || 0.4;
            this.errmsg = config.dimming || 'System Error!';
            this.Alert = config.Alert;
            this.Wait = config.Wait;
            this.Remind = config.Remind;
        } else {
            this.dimming = 0.4;
            this.errmsg = 'System Error!';
        }
        this.dismiss = function(meta, finish) {
            if (_this.container) {
                _this.add({ type: 'dismiss', meta: meta, finish: finish });
            }
        };
        this.remind = function(msg, title, duration) {
            if (_this.Remind && _this.container) {
                duration = duration || 1;
                _this.add({ type: 'present', meta: _this.Remind, props: { message: msg, title: title, duration: duration } });
            }
        };
        this.alert = function(props) {
            if (_this.Alert && _this.container && props) {
                if (typeof props === 'string') {
                    props = { message: props };
                }
                _this.add({ type: 'present', meta: _this.Alert, props: props });
            }
        };
        this.error = function(error) {
            _this.remind((error && error.message) || _this.errmsg);
        };
        this.wait = function(msg, timeout) {
            if (_this.Wait) {
                _this.add({ type: 'present', meta: _this.Wait, props: { message: msg, timeout: timeout > 0 ? timeout : 20 } });
            }
        };
        this.idle = function() {
            if (_this.Wait) {
                _this.add({ type: 'dismiss', meta: _this.Wait });
            }
        };
        var div = document.createElement('div');
        var style = div.style;
        style.transition = 'opacity 0.3s linear';
        this.root = div;
        div.addEventListener('transitionend', function(evt) {
            return _this.onAniFinish(evt);
        });
        document.body.append(this.root);
        var dom = react_1.default.createElement(
            Context.Provider,
            { value: { pop: this } },
            react_1.default.createElement(Container, {
                ref: function(ins) {
                    return (_this.container = ins);
                },
            }),
        );
        react_dom_1.default.render(dom, this.root);
    }
    Poper.prototype.present = function(meta, props) {
        if (this.container) {
            this.add({ type: 'present', meta: meta, props: props });
        }
    };
    Poper.prototype.onAniFinish = function(event) {
        if (event.propertyName === 'opacity' && this.root.style.opacity == '0') {
            if (this.clearFinish) {
                this.clearFinish();
                this.root.style.opacity = '1';
                this.clearFinish = undefined;
            }
        }
    };
    Poper.prototype.add = function(op) {
        this.opqueue.push(op);
        this.next();
    };
    Poper.prototype.next = function() {
        if (this.current) return;
        this.current = this.opqueue.shift();
        if (!this.current) return;
        var _a = this.current,
            type = _a.type,
            meta = _a.meta,
            finish = _a.finish,
            props = _a.props;
        switch (type) {
            case 'dismiss':
                this._remove(meta, finish);
                break;
            case 'present':
                this._present(meta, props);
                break;
        }
    };
    Poper.prototype._present = function(meta, props) {
        var _this = this;
        this.container.addModal(meta, props, function() {
            _this.current = undefined;
            _this.next();
        });
    };
    Poper.prototype._clear = function(finish) {
        var _this = this;
        this.root.style.opacity = '0';
        this.clearFinish = function() {
            _this.container.clear();
            if (finish) {
                finish();
            }
            _this.current = undefined;
            _this.next();
        };
    };
    Poper.prototype._remove = function(meta, finish) {
        var _this = this;
        var block = function() {
            if (finish) {
                finish();
            }
            _this.current = undefined;
            _this.next();
        };
        switch (typeof meta) {
            case 'number':
                this.container.delIndex(meta, block);
                break;
            case 'function':
                this.container.delModal(meta, block);
            default:
                this._clear(finish);
                break;
        }
    };
    return Poper;
})();
exports.Poper = Poper;

! function(modules) {
    var installedModules = {};

    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.l = !0, module.exports
    }
    __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            configurable: !1,
            enumerable: !0,
            get: getter
        })
    }, __webpack_require__.r = function(exports) {
        Object.defineProperty(exports, "__esModule", {
            value: !0
        })
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module["default"]
        } : function() {
            return module
        };
        return __webpack_require__.d(getter, "a", getter), getter
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property)
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 169)
}([
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(4),
            getOwnPropertyDescriptor = __webpack_require__(11).f,
            hide = __webpack_require__(16),
            redefine = __webpack_require__(34),
            setGlobal = __webpack_require__(33),
            copyConstructorProperties = __webpack_require__(103),
            isForced = __webpack_require__(100);
        module.exports = function(options, source) {
            var target, key, targetProperty, sourceProperty, descriptor, TARGET = options.target,
                GLOBAL = options.global,
                STATIC = options.stat;
            if (target = GLOBAL ? global : STATIC ? global[TARGET] || setGlobal(TARGET, {}) : (global[TARGET] || {}).prototype)
                for (key in source) {
                    if (sourceProperty = source[key], targetProperty = options.noTargetGet ? (descriptor = getOwnPropertyDescriptor(target, key)) && descriptor.value : target[key], !isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced) && targetProperty !== undefined) {
                        if (typeof sourceProperty == typeof targetProperty) continue;
                        copyConstructorProperties(sourceProperty, targetProperty)
                    }(options.sham || targetProperty && targetProperty.sham) && hide(sourceProperty, "sham", !0), redefine(target, key, sourceProperty, options)
                }
        }
    },
    function(module, exports) {
        module.exports = function(exec) {
            try {
                return !!exec()
            } catch (error) {
                return !0
            }
        }
    },
    function(module, exports, __webpack_require__) {
        var fails = __webpack_require__(1);
        module.exports = !fails(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7
                }
            }).a
        })
    },
    function(module, exports) {
        module.exports = function(it) {
            return "object" == typeof it ? null !== it : "function" == typeof it
        }
    },
    function(module, exports, __webpack_require__) {
        (function(global) {
            var O = "object",
                check = function(it) {
                    return it && it.Math == Math && it
                };
            module.exports = check(typeof globalThis == O && globalThis) || check(typeof window == O && window) || check(typeof self == O && self) || check(typeof global == O && global) || Function("return this")()
        }).call(this, __webpack_require__(59))
    },
    function(module, exports, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__(2),
            IE8_DOM_DEFINE = __webpack_require__(57),
            anObject = __webpack_require__(9),
            toPrimitive = __webpack_require__(12),
            nativeDefineProperty = Object.defineProperty;
        exports.f = DESCRIPTORS ? nativeDefineProperty : function(O, P, Attributes) {
            if (anObject(O), P = toPrimitive(P, !0), anObject(Attributes), IE8_DOM_DEFINE) try {
                return nativeDefineProperty(O, P, Attributes)
            } catch (error) {}
            if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported");
            return "value" in Attributes && (O[P] = Attributes.value), O
        }
    },
    function(module, exports, __webpack_require__) {
        var requireObjectCoercible = __webpack_require__(58);
        module.exports = function(argument) {
            return Object(requireObjectCoercible(argument))
        }
    },
    function(module, exports) {
        var hasOwnProperty = {}.hasOwnProperty;
        module.exports = function(it, key) {
            return hasOwnProperty.call(it, key)
        }
    },
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(4),
            shared = __webpack_require__(15),
            uid = __webpack_require__(19),
            NATIVE_SYMBOL = __webpack_require__(49),
            Symbol = global.Symbol,
            store = shared("wks");
        module.exports = function(name) {
            return store[name] || (store[name] = NATIVE_SYMBOL && Symbol[name] || (NATIVE_SYMBOL ? Symbol : uid)("Symbol." + name))
        }
    },
    function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(3);
        module.exports = function(it) {
            if (!isObject(it)) throw TypeError(String(it) + " is not an object");
            return it
        }
    },
    function(module, exports, __webpack_require__) {
        var IndexedObject = __webpack_require__(36),
            requireObjectCoercible = __webpack_require__(58);
        module.exports = function(it) {
            return IndexedObject(requireObjectCoercible(it))
        }
    },
    function(module, exports, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__(2),
            propertyIsEnumerableModule = __webpack_require__(22),
            createPropertyDescriptor = __webpack_require__(21),
            toIndexedObject = __webpack_require__(10),
            toPrimitive = __webpack_require__(12),
            has = __webpack_require__(7),
            IE8_DOM_DEFINE = __webpack_require__(57),
            nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function(O, P) {
            if (O = toIndexedObject(O), P = toPrimitive(P, !0), IE8_DOM_DEFINE) try {
                return nativeGetOwnPropertyDescriptor(O, P)
            } catch (error) {}
            if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P])
        }
    },
    function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(3);
        module.exports = function(input, PREFERRED_STRING) {
            if (!isObject(input)) return input;
            var fn, val;
            if (PREFERRED_STRING && "function" == typeof(fn = input.toString) && !isObject(val = fn.call(input))) return val;
            if ("function" == typeof(fn = input.valueOf) && !isObject(val = fn.call(input))) return val;
            if (!PREFERRED_STRING && "function" == typeof(fn = input.toString) && !isObject(val = fn.call(input))) return val;
            throw TypeError("Can't convert object to primitive value")
        }
    },
    function(module, exports, __webpack_require__) {
        var internalObjectKeys = __webpack_require__(51),
            enumBugKeys = __webpack_require__(28);
        module.exports = Object.keys || function(O) {
            return internalObjectKeys(O, enumBugKeys)
        }
    },
    function(module, exports) {
        module.exports = {}
    },
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(4),
            setGlobal = __webpack_require__(33),
            IS_PURE = __webpack_require__(32),
            store = global["__core-js_shared__"] || setGlobal("__core-js_shared__", {});
        (module.exports = function(key, value) {
            return store[key] || (store[key] = value !== undefined ? value : {})
        })("versions", []).push({
            version: "3.2.1",
            mode: IS_PURE ? "pure" : "global",
            copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
        })
    },
    function(module, exports, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__(2),
            definePropertyModule = __webpack_require__(5),
            createPropertyDescriptor = __webpack_require__(21);
        module.exports = DESCRIPTORS ? function(object, key, value) {
            return definePropertyModule.f(object, key, createPropertyDescriptor(1, value))
        } : function(object, key, value) {
            return object[key] = value, object
        }
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        var IS_PURE = __webpack_require__(32),
            global = __webpack_require__(4),
            fails = __webpack_require__(1);
        module.exports = IS_PURE || !fails(function() {
            var key = Math.random();
            __defineSetter__.call(null, key, function() {}), delete global[key]
        })
    },
    function(module, exports, __webpack_require__) {
        var fails = __webpack_require__(1);
        module.exports = !fails(function() {
            return Object.isExtensible(Object.preventExtensions({}))
        })
    },
    function(module, exports) {
        var id = 0,
            postfix = Math.random();
        module.exports = function(key) {
            return "Symbol(" + String(key === undefined ? "" : key) + ")_" + (++id + postfix).toString(36)
        }
    },
    function(module, exports, __webpack_require__) {
        var shared = __webpack_require__(15),
            uid = __webpack_require__(19),
            keys = shared("keys");
        module.exports = function(key) {
            return keys[key] || (keys[key] = uid(key))
        }
    },
    function(module, exports) {
        module.exports = function(bitmap, value) {
            return {
                enumerable: !(1 & bitmap),
                configurable: !(2 & bitmap),
                writable: !(4 & bitmap),
                value: value
            }
        }
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        var nativePropertyIsEnumerable = {}.propertyIsEnumerable,
            getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
            NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
                1: 2
            }, 1);
        exports.f = NASHORN_BUG ? function(V) {
            var descriptor = getOwnPropertyDescriptor(this, V);
            return !!descriptor && descriptor.enumerable
        } : nativePropertyIsEnumerable
    },
    function(module, exports, __webpack_require__) {
        var has = __webpack_require__(7),
            toObject = __webpack_require__(6),
            sharedKey = __webpack_require__(20),
            CORRECT_PROTOTYPE_GETTER = __webpack_require__(38),
            IE_PROTO = sharedKey("IE_PROTO"),
            ObjectPrototype = Object.prototype;
        module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function(O) {
            return O = toObject(O), has(O, IE_PROTO) ? O[IE_PROTO] : "function" == typeof O.constructor && O instanceof O.constructor ? O.constructor.prototype : O instanceof Object ? ObjectPrototype : null
        }
    },
    function(module, exports, __webpack_require__) {
        var hiddenKeys = __webpack_require__(14),
            isObject = __webpack_require__(3),
            has = __webpack_require__(7),
            defineProperty = __webpack_require__(5).f,
            uid = __webpack_require__(19),
            FREEZING = __webpack_require__(18),
            METADATA = uid("meta"),
            id = 0,
            isExtensible = Object.isExtensible || function() {
                return !0
            },
            setMetadata = function(it) {
                defineProperty(it, METADATA, {
                    value: {
                        objectID: "O" + ++id,
                        weakData: {}
                    }
                })
            },
            meta = module.exports = {
                REQUIRED: !1,
                fastKey: function(it, create) {
                    if (!isObject(it)) return "symbol" == typeof it ? it : ("string" == typeof it ? "S" : "P") + it;
                    if (!has(it, METADATA)) {
                        if (!isExtensible(it)) return "F";
                        if (!create) return "E";
                        setMetadata(it)
                    }
                    return it[METADATA].objectID
                },
                getWeakData: function(it, create) {
                    if (!has(it, METADATA)) {
                        if (!isExtensible(it)) return !0;
                        if (!create) return !1;
                        setMetadata(it)
                    }
                    return it[METADATA].weakData
                },
                onFreeze: function(it) {
                    return FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA) && setMetadata(it), it
                }
            };
        hiddenKeys[METADATA] = !0
    },
    function(module, exports) {
        module.exports = function(it) {
            if ("function" != typeof it) throw TypeError(String(it) + " is not a function");
            return it
        }
    },
    function(module, exports, __webpack_require__) {
        var defineProperty = __webpack_require__(5).f,
            has = __webpack_require__(7),
            TO_STRING_TAG = __webpack_require__(8)("toStringTag");
        module.exports = function(it, TAG, STATIC) {
            it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG) && defineProperty(it, TO_STRING_TAG, {
                configurable: !0,
                value: TAG
            })
        }
    },
    function(module, exports) {
        exports.f = Object.getOwnPropertySymbols
    },
    function(module, exports) {
        module.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
    },
    function(module, exports, __webpack_require__) {
        var toInteger = __webpack_require__(50),
            min = Math.min;
        module.exports = function(argument) {
            return argument > 0 ? min(toInteger(argument), 9007199254740991) : 0
        }
    },
    function(module, exports, __webpack_require__) {
        var internalObjectKeys = __webpack_require__(51),
            hiddenKeys = __webpack_require__(28).concat("length", "prototype");
        exports.f = Object.getOwnPropertyNames || function(O) {
            return internalObjectKeys(O, hiddenKeys)
        }
    },
    function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(4)
    },
    function(module, exports) {
        module.exports = !1
    },
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(4),
            hide = __webpack_require__(16);
        module.exports = function(key, value) {
            try {
                hide(global, key, value)
            } catch (error) {
                global[key] = value
            }
            return value
        }
    },
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(4),
            shared = __webpack_require__(15),
            hide = __webpack_require__(16),
            has = __webpack_require__(7),
            setGlobal = __webpack_require__(33),
            nativeFunctionToString = __webpack_require__(55),
            InternalStateModule = __webpack_require__(54),
            getInternalState = InternalStateModule.get,
            enforceInternalState = InternalStateModule.enforce,
            TEMPLATE = String(nativeFunctionToString).split("toString");
        shared("inspectSource", function(it) {
            return nativeFunctionToString.call(it)
        }), (module.exports = function(O, key, value, options) {
            var unsafe = !!options && !!options.unsafe,
                simple = !!options && !!options.enumerable,
                noTargetGet = !!options && !!options.noTargetGet;
            "function" == typeof value && ("string" != typeof key || has(value, "name") || hide(value, "name", key), enforceInternalState(value).source = TEMPLATE.join("string" == typeof key ? key : "")), O !== global ? (unsafe ? !noTargetGet && O[key] && (simple = !0) : delete O[key], simple ? O[key] = value : hide(O, key, value)) : simple ? O[key] = value : setGlobal(key, value)
        })(Function.prototype, "toString", function() {
            return "function" == typeof this && getInternalState(this).source || nativeFunctionToString.call(this)
        })
    },
    function(module, exports) {
        var toString = {}.toString;
        module.exports = function(it) {
            return toString.call(it).slice(8, -1)
        }
    },
    function(module, exports, __webpack_require__) {
        var fails = __webpack_require__(1),
            classof = __webpack_require__(35),
            split = "".split;
        module.exports = fails(function() {
            return !Object("z").propertyIsEnumerable(0)
        }) ? function(it) {
            return "String" == classof(it) ? split.call(it, "") : Object(it)
        } : Object
    },
    function(module, exports) {
        module.exports = jQuery
    },
    function(module, exports, __webpack_require__) {
        var fails = __webpack_require__(1);
        module.exports = !fails(function() {
            function F() {}
            return F.prototype.constructor = null, Object.getPrototypeOf(new F) !== F.prototype
        })
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        var toPrimitive = __webpack_require__(12),
            definePropertyModule = __webpack_require__(5),
            createPropertyDescriptor = __webpack_require__(21);
        module.exports = function(object, key, value) {
            var propertyKey = toPrimitive(key);
            propertyKey in object ? definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value)) : object[propertyKey] = value
        }
    },
    function(module, exports, __webpack_require__) {
        var classofRaw = __webpack_require__(35),
            TO_STRING_TAG = __webpack_require__(8)("toStringTag"),
            CORRECT_ARGUMENTS = "Arguments" == classofRaw(function() {
                return arguments
            }());
        module.exports = function(it) {
            var O, tag, result;
            return it === undefined ? "Undefined" : null === it ? "Null" : "string" == typeof(tag = function(it, key) {
                try {
                    return it[key]
                } catch (error) {}
            }(O = Object(it), TO_STRING_TAG)) ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : "Object" == (result = classofRaw(O)) && "function" == typeof O.callee ? "Arguments" : result
        }
    },
    function(module, exports) {
        module.exports = {}
    },
    function(module, exports, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__(2),
            objectKeys = __webpack_require__(13),
            toIndexedObject = __webpack_require__(10),
            propertyIsEnumerable = __webpack_require__(22).f,
            createMethod = function(TO_ENTRIES) {
                return function(it) {
                    for (var key, O = toIndexedObject(it), keys = objectKeys(O), length = keys.length, i = 0, result = []; length > i;) key = keys[i++], DESCRIPTORS && !propertyIsEnumerable.call(O, key) || result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
                    return result
                }
            };
        module.exports = {
            entries: createMethod(!0),
            values: createMethod(!1)
        }
    },
    function(module, exports, __webpack_require__) {
        var aFunction = __webpack_require__(25);
        module.exports = function(fn, that, length) {
            if (aFunction(fn), that === undefined) return fn;
            switch (length) {
                case 0:
                    return function() {
                        return fn.call(that)
                    };
                case 1:
                    return function(a) {
                        return fn.call(that, a)
                    };
                case 2:
                    return function(a, b) {
                        return fn.call(that, a, b)
                    };
                case 3:
                    return function(a, b, c) {
                        return fn.call(that, a, b, c)
                    }
            }
            return function() {
                return fn.apply(that, arguments)
            }
        }
    },
    function(module, exports, __webpack_require__) {
        exports.f = __webpack_require__(8)
    },
    function(module, exports, __webpack_require__) {
        var toIndexedObject = __webpack_require__(10),
            nativeGetOwnPropertyNames = __webpack_require__(30).f,
            toString = {}.toString,
            windowNames = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
        module.exports.f = function(it) {
            return windowNames && "[object Window]" == toString.call(it) ? function(it) {
                try {
                    return nativeGetOwnPropertyNames(it)
                } catch (error) {
                    return windowNames.slice()
                }
            }(it) : nativeGetOwnPropertyNames(toIndexedObject(it))
        }
    },
    function(module, exports, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__(2),
            definePropertyModule = __webpack_require__(5),
            anObject = __webpack_require__(9),
            objectKeys = __webpack_require__(13);
        module.exports = DESCRIPTORS ? Object.defineProperties : function(O, Properties) {
            anObject(O);
            for (var key, keys = objectKeys(Properties), length = keys.length, index = 0; length > index;) definePropertyModule.f(O, key = keys[index++], Properties[key]);
            return O
        }
    },
    function(module, exports, __webpack_require__) {
        var anObject = __webpack_require__(9),
            defineProperties = __webpack_require__(46),
            enumBugKeys = __webpack_require__(28),
            hiddenKeys = __webpack_require__(14),
            html = __webpack_require__(99),
            documentCreateElement = __webpack_require__(56),
            IE_PROTO = __webpack_require__(20)("IE_PROTO"),
            Empty = function() {},
            createDict = function() {
                var iframeDocument, iframe = documentCreateElement("iframe"),
                    length = enumBugKeys.length;
                for (iframe.style.display = "none", html.appendChild(iframe), iframe.src = String("javascript:"), (iframeDocument = iframe.contentWindow.document).open(), iframeDocument.write("<script>document.F=Object<\/script>"), iframeDocument.close(), createDict = iframeDocument.F; length--;) delete createDict.prototype[enumBugKeys[length]];
                return createDict()
            };
        module.exports = Object.create || function(O, Properties) {
            var result;
            return null !== O ? (Empty.prototype = anObject(O), result = new Empty, Empty.prototype = null, result[IE_PROTO] = O) : result = createDict(), Properties === undefined ? result : defineProperties(result, Properties)
        }, hiddenKeys[IE_PROTO] = !0
    },
    function(module, exports, __webpack_require__) {
        var classof = __webpack_require__(35);
        module.exports = Array.isArray || function(arg) {
            return "Array" == classof(arg)
        }
    },
    function(module, exports, __webpack_require__) {
        var fails = __webpack_require__(1);
        module.exports = !!Object.getOwnPropertySymbols && !fails(function() {
            return !String(Symbol())
        })
    },
    function(module, exports) {
        var ceil = Math.ceil,
            floor = Math.floor;
        module.exports = function(argument) {
            return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument)
        }
    },
    function(module, exports, __webpack_require__) {
        var has = __webpack_require__(7),
            toIndexedObject = __webpack_require__(10),
            indexOf = __webpack_require__(102).indexOf,
            hiddenKeys = __webpack_require__(14);
        module.exports = function(object, names) {
            var key, O = toIndexedObject(object),
                i = 0,
                result = [];
            for (key in O)!has(hiddenKeys, key) && has(O, key) && result.push(key);
            for (; names.length > i;) has(O, key = names[i++]) && (~indexOf(result, key) || result.push(key));
            return result
        }
    },
    function(module, exports, __webpack_require__) {
        var path = __webpack_require__(31),
            global = __webpack_require__(4),
            aFunction = function(variable) {
                return "function" == typeof variable ? variable : undefined
            };
        module.exports = function(namespace, method) {
            return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace]) : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method]
        }
    },
    function(module, exports, __webpack_require__) {
        var getBuiltIn = __webpack_require__(52),
            getOwnPropertyNamesModule = __webpack_require__(30),
            getOwnPropertySymbolsModule = __webpack_require__(27),
            anObject = __webpack_require__(9);
        module.exports = getBuiltIn("Reflect", "ownKeys") || function(it) {
            var keys = getOwnPropertyNamesModule.f(anObject(it)),
                getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
            return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys
        }
    },
    function(module, exports, __webpack_require__) {
        var set, get, has, NATIVE_WEAK_MAP = __webpack_require__(104), global = __webpack_require__(4), isObject = __webpack_require__(3), hide = __webpack_require__(16), objectHas = __webpack_require__(7), sharedKey = __webpack_require__(20), hiddenKeys = __webpack_require__(14), WeakMap = global.WeakMap;
        if (NATIVE_WEAK_MAP) {
            var store = new WeakMap,
                wmget = store.get,
                wmhas = store.has,
                wmset = store.set;
            set = function(it, metadata) {
                return wmset.call(store, it, metadata), metadata
            }, get = function(it) {
                return wmget.call(store, it) || {}
            }, has = function(it) {
                return wmhas.call(store, it)
            }
        } else {
            var STATE = sharedKey("state");
            hiddenKeys[STATE] = !0, set = function(it, metadata) {
                return hide(it, STATE, metadata), metadata
            }, get = function(it) {
                return objectHas(it, STATE) ? it[STATE] : {}
            }, has = function(it) {
                return objectHas(it, STATE)
            }
        }
        module.exports = {
            set: set,
            get: get,
            has: has,
            enforce: function(it) {
                return has(it) ? get(it) : set(it, {})
            },
            getterFor: function(TYPE) {
                return function(it) {
                    var state;
                    if (!isObject(it) || (state = get(it)).type !== TYPE) throw TypeError("Incompatible receiver, " + TYPE + " required");
                    return state
                }
            }
        }
    },
    function(module, exports, __webpack_require__) {
        var shared = __webpack_require__(15);
        module.exports = shared("native-function-to-string", Function.toString)
    },
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(4),
            isObject = __webpack_require__(3),
            document = global.document,
            EXISTS = isObject(document) && isObject(document.createElement);
        module.exports = function(it) {
            return EXISTS ? document.createElement(it) : {}
        }
    },
    function(module, exports, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__(2),
            fails = __webpack_require__(1),
            createElement = __webpack_require__(56);
        module.exports = !DESCRIPTORS && !fails(function() {
            return 7 != Object.defineProperty(createElement("div"), "a", {
                get: function() {
                    return 7
                }
            }).a
        })
    },
    function(module, exports) {
        module.exports = function(it) {
            if (it == undefined) throw TypeError("Can't call method on " + it);
            return it
        }
    },
    function(module, exports) {
        var g;
        g = function() {
            return this
        }();
        try {
            g = g || Function("return this")() || (0, eval)("this")
        } catch (e) {
            "object" == typeof window && (g = window)
        }
        module.exports = g
    },
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(4);
        __webpack_require__(26)(global.JSON, "JSON", !0)
    },
    function(module, exports, __webpack_require__) {
        __webpack_require__(26)(Math, "Math", !0)
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        var $ = __webpack_require__(0),
            DESCRIPTORS = __webpack_require__(2),
            FORCED = __webpack_require__(17),
            toObject = __webpack_require__(6),
            toPrimitive = __webpack_require__(12),
            getPrototypeOf = __webpack_require__(23),
            getOwnPropertyDescriptor = __webpack_require__(11).f;
        DESCRIPTORS && $({
            target: "Object",
            proto: !0,
            forced: FORCED
        }, {
            __lookupSetter__: function(P) {
                var desc, O = toObject(this),
                    key = toPrimitive(P, !0);
                do {
                    if (desc = getOwnPropertyDescriptor(O, key)) return desc.set
                } while (O = getPrototypeOf(O))
            }
        })
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        var $ = __webpack_require__(0),
            DESCRIPTORS = __webpack_require__(2),
            FORCED = __webpack_require__(17),
            toObject = __webpack_require__(6),
            toPrimitive = __webpack_require__(12),
            getPrototypeOf = __webpack_require__(23),
            getOwnPropertyDescriptor = __webpack_require__(11).f;
        DESCRIPTORS && $({
            target: "Object",
            proto: !0,
            forced: FORCED
        }, {
            __lookupGetter__: function(P) {
                var desc, O = toObject(this),
                    key = toPrimitive(P, !0);
                do {
                    if (desc = getOwnPropertyDescriptor(O, key)) return desc.get
                } while (O = getPrototypeOf(O))
            }
        })
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        var $ = __webpack_require__(0),
            DESCRIPTORS = __webpack_require__(2),
            FORCED = __webpack_require__(17),
            toObject = __webpack_require__(6),
            aFunction = __webpack_require__(25),
            definePropertyModule = __webpack_require__(5);
        DESCRIPTORS && $({
            target: "Object",
            proto: !0,
            forced: FORCED
        }, {
            __defineSetter__: function(P, setter) {
                definePropertyModule.f(toObject(this), P, {
                    set: aFunction(setter),
                    enumerable: !0,
                    configurable: !0
                })
            }
        })
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        var $ = __webpack_require__(0),
            DESCRIPTORS = __webpack_require__(2),
            FORCED = __webpack_require__(17),
            toObject = __webpack_require__(6),
            aFunction = __webpack_require__(25),
            definePropertyModule = __webpack_require__(5);
        DESCRIPTORS && $({
            target: "Object",
            proto: !0,
            forced: FORCED
        }, {
            __defineGetter__: function(P, getter) {
                definePropertyModule.f(toObject(this), P, {
                    get: aFunction(getter),
                    enumerable: !0,
                    configurable: !0
                })
            }
        })
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        var classof = __webpack_require__(40),
            test = {};
        test[__webpack_require__(8)("toStringTag")] = "z", module.exports = "[object z]" !== String(test) ? function() {
            return "[object " + classof(this) + "]"
        } : test.toString
    },
    function(module, exports, __webpack_require__) {
        var redefine = __webpack_require__(34),
            toString = __webpack_require__(66),
            ObjectPrototype = Object.prototype;
        toString !== ObjectPrototype.toString && redefine(ObjectPrototype, "toString", toString, {
            unsafe: !0
        })
    },
    function(module, exports, __webpack_require__) {
        var $ = __webpack_require__(0),
            $values = __webpack_require__(42).values;
        $({
            target: "Object",
            stat: !0
        }, {
            values: function(O) {
                return $values(O)
            }
        })
    },
    function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(3);
        module.exports = function(it) {
            if (!isObject(it) && null !== it) throw TypeError("Can't set " + String(it) + " as a prototype");
            return it
        }
    },
    function(module, exports, __webpack_require__) {
        var anObject = __webpack_require__(9),
            aPossiblePrototype = __webpack_require__(69);
        module.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
            var setter, CORRECT_SETTER = !1,
                test = {};
            try {
                (setter = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(test, []), CORRECT_SETTER = test instanceof Array
            } catch (error) {}
            return function(O, proto) {
                return anObject(O), aPossiblePrototype(proto), CORRECT_SETTER ? setter.call(O, proto) : O.__proto__ = proto, O
            }
        }() : undefined)
    },
    function(module, exports, __webpack_require__) {
        __webpack_require__(0)({
            target: "Object",
            stat: !0
        }, {
            setPrototypeOf: __webpack_require__(70)
        })
    },
    function(module, exports, __webpack_require__) {
        var $ = __webpack_require__(0),
            isObject = __webpack_require__(3),
            onFreeze = __webpack_require__(24).onFreeze,
            FREEZING = __webpack_require__(18),
            fails = __webpack_require__(1),
            nativeSeal = Object.seal;
        $({
            target: "Object",
            stat: !0,
            forced: fails(function() {
                nativeSeal(1)
            }),
            sham: !FREEZING
        }, {
            seal: function(it) {
                return nativeSeal && isObject(it) ? nativeSeal(onFreeze(it)) : it
            }
        })
    },
    function(module, exports, __webpack_require__) {
        var $ = __webpack_require__(0),
            isObject = __webpack_require__(3),
            onFreeze = __webpack_require__(24).onFreeze,
            FREEZING = __webpack_require__(18),
            fails = __webpack_require__(1),
            nativePreventExtensions = Object.preventExtensions;
        $({
            target: "Object",
            stat: !0,
            forced: fails(function() {
                nativePreventExtensions(1)
            }),
            sham: !FREEZING
        }, {
            preventExtensions: function(it) {
                return nativePreventExtensions && isObject(it) ? nativePreventExtensions(onFreeze(it)) : it
            }
        })
    },
    function(module, exports, __webpack_require__) {
        var $ = __webpack_require__(0),
            toObject = __webpack_require__(6),
            nativeKeys = __webpack_require__(13);
        $({
            target: "Object",
            stat: !0,
            forced: __webpack_require__(1)(function() {
                nativeKeys(1)
            })
        }, {
            keys: function(it) {
                return nativeKeys(toObject(it))
            }
        })
    },
    function(module, exports, __webpack_require__) {
        var $ = __webpack_require__(0),
            fails = __webpack_require__(1),
            isObject = __webpack_require__(3),
            nativeIsSealed = Object.isSealed;
        $({
            target: "Object",
            stat: !0,
            forced: fails(function() {
                nativeIsSealed(1)
            })
        }, {
            isSealed: function(it) {
                return !isObject(it) || !!nativeIsSealed && nativeIsSealed(it)
            }
        })
    },
    function(module, exports, __webpack_require__) {
        var $ = __webpack_require__(0),
            fails = __webpack_require__(1),
            isObject = __webpack_require__(3),
            nativeIsFrozen = Object.isFrozen;
        $({
            target: "Object",
            stat: !0,
            forced: fails(function() {
                nativeIsFrozen(1)
            })
        }, {
            isFrozen: function(it) {
                return !isObject(it) || !!nativeIsFrozen && nativeIsFrozen(it)
            }
        })
    },
    function(module, exports, __webpack_require__) {
        var $ = __webpack_require__(0),
            fails = __webpack_require__(1),
            isObject = __webpack_require__(3),
            nativeIsExtensible = Object.isExtensible;
        $({
            target: "Object",
            stat: !0,
            forced: fails(function() {
                nativeIsExtensible(1)
            })
        }, {
            isExtensible: function(it) {
                return !!isObject(it) && (!nativeIsExtensible || nativeIsExtensible(it))
            }
        })
    },
    function(module, exports) {
        module.exports = Object.is || function(x, y) {
            return x === y ? 0 !== x || 1 / x == 1 / y : x != x && y != y
        }
    },
    function(module, exports, __webpack_require__) {
        __webpack_require__(0)({
            target: "Object",
            stat: !0
        }, {
            is: __webpack_require__(78)
        })
    },
    function(module, exports, __webpack_require__) {
        var $ = __webpack_require__(0),
            fails = __webpack_require__(1),
            toObject = __webpack_require__(6),
            nativeGetPrototypeOf = __webpack_require__(23),
            CORRECT_PROTOTYPE_GETTER = __webpack_require__(38);
        $({
            target: "Object",
            stat: !0,
            forced: fails(function() {
                nativeGetPrototypeOf(1)
            }),
            sham: !CORRECT_PROTOTYPE_GETTER
        }, {
            getPrototypeOf: function(it) {
                return nativeGetPrototypeOf(toObject(it))
            }
        })
    },
    function(module, exports, __webpack_require__) {
        var $ = __webpack_require__(0),
            fails = __webpack_require__(1),
            nativeGetOwnPropertyNames = __webpack_require__(45).f;
        $({
            target: "Object",
            stat: !0,
            forced: fails(function() {
                return !Object.getOwnPropertyNames(1)
            })
        }, {
            getOwnPropertyNames: nativeGetOwnPropertyNames
        })
    },
    function(module, exports, __webpack_require__) {
        var $ = __webpack_require__(0),
            DESCRIPTORS = __webpack_require__(2),
            ownKeys = __webpack_require__(53),
            toIndexedObject = __webpack_require__(10),
            getOwnPropertyDescriptorModule = __webpack_require__(11),
            createProperty = __webpack_require__(39);
        $({
            target: "Object",
            stat: !0,
            sham: !DESCRIPTORS
        }, {
            getOwnPropertyDescriptors: function(object) {
                for (var key, descriptor, O = toIndexedObject(object), getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f, keys = ownKeys(O), result = {}, index = 0; keys.length > index;)(descriptor = getOwnPropertyDescriptor(O, key = keys[index++])) !== undefined && createProperty(result, key, descriptor);
                return result
            }
        })
    },
    function(module, exports, __webpack_require__) {
        var $ = __webpack_require__(0),
            fails = __webpack_require__(1),
            toIndexedObject = __webpack_require__(10),
            nativeGetOwnPropertyDescriptor = __webpack_require__(11).f,
            DESCRIPTORS = __webpack_require__(2),
            FAILS_ON_PRIMITIVES = fails(function() {
                nativeGetOwnPropertyDescriptor(1)
            });
        $({
            target: "Object",
            stat: !0,
            forced: !DESCRIPTORS || FAILS_ON_PRIMITIVES,
            sham: !DESCRIPTORS
        }, {
            getOwnPropertyDescriptor: function(it, key) {
                return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key)
            }
        })
    },
    function(module, exports, __webpack_require__) {
        var anObject = __webpack_require__(9);
        module.exports = function(iterator, fn, value, ENTRIES) {
            try {
                return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value)
            } catch (error) {
                var returnMethod = iterator["return"];
                throw returnMethod !== undefined && anObject(returnMethod.call(iterator)), error
            }
        }
    },
    function(module, exports, __webpack_require__) {
        var classof = __webpack_require__(40),
            Iterators = __webpack_require__(41),
            ITERATOR = __webpack_require__(8)("iterator");
        module.exports = function(it) {
            if (it != undefined) return it[ITERATOR] || it["@@iterator"] || Iterators[classof(it)]
        }
    },
    function(module, exports, __webpack_require__) {
        var wellKnownSymbol = __webpack_require__(8),
            Iterators = __webpack_require__(41),
            ITERATOR = wellKnownSymbol("iterator"),
            ArrayPrototype = Array.prototype;
        module.exports = function(it) {
            return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it)
        }
    },
    function(module, exports, __webpack_require__) {
        var anObject = __webpack_require__(9),
            isArrayIteratorMethod = __webpack_require__(86),
            toLength = __webpack_require__(29),
            bind = __webpack_require__(43),
            getIteratorMethod = __webpack_require__(85),
            callWithSafeIterationClosing = __webpack_require__(84),
            Result = function(stopped, result) {
                this.stopped = stopped, this.result = result
            };
        (module.exports = function(iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
            var iterator, iterFn, index, length, result, step, boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
            if (IS_ITERATOR) iterator = iterable;
            else {
                if ("function" != typeof(iterFn = getIteratorMethod(iterable))) throw TypeError("Target is not iterable");
                if (isArrayIteratorMethod(iterFn)) {
                    for (index = 0, length = toLength(iterable.length); length > index; index++)
                        if ((result = AS_ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index])) && result instanceof Result) return result;
                    return new Result(!1)
                }
                iterator = iterFn.call(iterable)
            }
            for (; !(step = iterator.next()).done;)
                if ((result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES)) && result instanceof Result) return result;
            return new Result(!1)
        }).stop = function(result) {
            return new Result(!0, result)
        }
    },
    function(module, exports, __webpack_require__) {
        var $ = __webpack_require__(0),
            iterate = __webpack_require__(87),
            createProperty = __webpack_require__(39);
        $({
            target: "Object",
            stat: !0
        }, {
            fromEntries: function(iterable) {
                var obj = {};
                return iterate(iterable, function(k, v) {
                    createProperty(obj, k, v)
                }, undefined, !0), obj
            }
        })
    },
    function(module, exports, __webpack_require__) {
        var $ = __webpack_require__(0),
            FREEZING = __webpack_require__(18),
            fails = __webpack_require__(1),
            isObject = __webpack_require__(3),
            onFreeze = __webpack_require__(24).onFreeze,
            nativeFreeze = Object.freeze;
        $({
            target: "Object",
            stat: !0,
            forced: fails(function() {
                nativeFreeze(1)
            }),
            sham: !FREEZING
        }, {
            freeze: function(it) {
                return nativeFreeze && isObject(it) ? nativeFreeze(onFreeze(it)) : it
            }
        })
    },
    function(module, exports, __webpack_require__) {
        var $ = __webpack_require__(0),
            $entries = __webpack_require__(42).entries;
        $({
            target: "Object",
            stat: !0
        }, {
            entries: function(O) {
                return $entries(O)
            }
        })
    },
    function(module, exports, __webpack_require__) {
        var $ = __webpack_require__(0),
            DESCRIPTORS = __webpack_require__(2);
        $({
            target: "Object",
            stat: !0,
            forced: !DESCRIPTORS,
            sham: !DESCRIPTORS
        }, {
            defineProperties: __webpack_require__(46)
        })
    },
    function(module, exports, __webpack_require__) {
        var $ = __webpack_require__(0),
            DESCRIPTORS = __webpack_require__(2);
        $({
            target: "Object",
            stat: !0,
            forced: !DESCRIPTORS,
            sham: !DESCRIPTORS
        }, {
            defineProperty: __webpack_require__(5).f
        })
    },
    function(module, exports, __webpack_require__) {
        __webpack_require__(0)({
            target: "Object",
            stat: !0,
            sham: !__webpack_require__(2)
        }, {
            create: __webpack_require__(47)
        })
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        var DESCRIPTORS = __webpack_require__(2),
            fails = __webpack_require__(1),
            objectKeys = __webpack_require__(13),
            getOwnPropertySymbolsModule = __webpack_require__(27),
            propertyIsEnumerableModule = __webpack_require__(22),
            toObject = __webpack_require__(6),
            IndexedObject = __webpack_require__(36),
            nativeAssign = Object.assign;
        module.exports = !nativeAssign || fails(function() {
            var A = {},
                B = {},
                symbol = Symbol();
            return A[symbol] = 7, "abcdefghijklmnopqrst".split("").forEach(function(chr) {
                B[chr] = chr
            }), 7 != nativeAssign({}, A)[symbol] || "abcdefghijklmnopqrst" != objectKeys(nativeAssign({}, B)).join("")
        }) ? function(target, source) {
            for (var T = toObject(target), argumentsLength = arguments.length, index = 1, getOwnPropertySymbols = getOwnPropertySymbolsModule.f, propertyIsEnumerable = propertyIsEnumerableModule.f; argumentsLength > index;)
                for (var key, S = IndexedObject(arguments[index++]), keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S), length = keys.length, j = 0; length > j;) key = keys[j++], DESCRIPTORS && !propertyIsEnumerable.call(S, key) || (T[key] = S[key]);
            return T
        } : nativeAssign
    },
    function(module, exports, __webpack_require__) {
        var $ = __webpack_require__(0),
            assign = __webpack_require__(94);
        $({
            target: "Object",
            stat: !0,
            forced: Object.assign !== assign
        }, {
            assign: assign
        })
    },
    function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(3),
            isArray = __webpack_require__(48),
            SPECIES = __webpack_require__(8)("species");
        module.exports = function(originalArray, length) {
            var C;
            return isArray(originalArray) && ("function" != typeof(C = originalArray.constructor) || C !== Array && !isArray(C.prototype) ? isObject(C) && null === (C = C[SPECIES]) && (C = undefined) : C = undefined), new(C === undefined ? Array : C)(0 === length ? 0 : length)
        }
    },
    function(module, exports, __webpack_require__) {
        var bind = __webpack_require__(43),
            IndexedObject = __webpack_require__(36),
            toObject = __webpack_require__(6),
            toLength = __webpack_require__(29),
            arraySpeciesCreate = __webpack_require__(96),
            push = [].push,
            createMethod = function(TYPE) {
                var IS_MAP = 1 == TYPE,
                    IS_FILTER = 2 == TYPE,
                    IS_SOME = 3 == TYPE,
                    IS_EVERY = 4 == TYPE,
                    IS_FIND_INDEX = 6 == TYPE,
                    NO_HOLES = 5 == TYPE || IS_FIND_INDEX;
                return function($this, callbackfn, that, specificCreate) {
                    for (var value, result, O = toObject($this), self = IndexedObject(O), boundFunction = bind(callbackfn, that, 3), length = toLength(self.length), index = 0, create = specificCreate || arraySpeciesCreate, target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined; length > index; index++)
                        if ((NO_HOLES || index in self) && (result = boundFunction(value = self[index], index, O), TYPE))
                            if (IS_MAP) target[index] = result;
                            else if (result) switch (TYPE) {
                        case 3:
                            return !0;
                        case 5:
                            return value;
                        case 6:
                            return index;
                        case 2:
                            push.call(target, value)
                    } else if (IS_EVERY) return !1;
                    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target
                }
            };
        module.exports = {
            forEach: createMethod(0),
            map: createMethod(1),
            filter: createMethod(2),
            some: createMethod(3),
            every: createMethod(4),
            find: createMethod(5),
            findIndex: createMethod(6)
        }
    },
    function(module, exports, __webpack_require__) {
        var path = __webpack_require__(31),
            has = __webpack_require__(7),
            wrappedWellKnownSymbolModule = __webpack_require__(44),
            defineProperty = __webpack_require__(5).f;
        module.exports = function(NAME) {
            var Symbol = path.Symbol || (path.Symbol = {});
            has(Symbol, NAME) || defineProperty(Symbol, NAME, {
                value: wrappedWellKnownSymbolModule.f(NAME)
            })
        }
    },
    function(module, exports, __webpack_require__) {
        var getBuiltIn = __webpack_require__(52);
        module.exports = getBuiltIn("document", "documentElement")
    },
    function(module, exports, __webpack_require__) {
        var fails = __webpack_require__(1),
            replacement = /#|\.prototype\./,
            isForced = function(feature, detection) {
                var value = data[normalize(feature)];
                return value == POLYFILL || value != NATIVE && ("function" == typeof detection ? fails(detection) : !!detection)
            },
            normalize = isForced.normalize = function(string) {
                return String(string).replace(replacement, ".").toLowerCase()
            },
            data = isForced.data = {},
            NATIVE = isForced.NATIVE = "N",
            POLYFILL = isForced.POLYFILL = "P";
        module.exports = isForced
    },
    function(module, exports, __webpack_require__) {
        var toInteger = __webpack_require__(50),
            max = Math.max,
            min = Math.min;
        module.exports = function(index, length) {
            var integer = toInteger(index);
            return integer < 0 ? max(integer + length, 0) : min(integer, length)
        }
    },
    function(module, exports, __webpack_require__) {
        var toIndexedObject = __webpack_require__(10),
            toLength = __webpack_require__(29),
            toAbsoluteIndex = __webpack_require__(101),
            createMethod = function(IS_INCLUDES) {
                return function($this, el, fromIndex) {
                    var value, O = toIndexedObject($this),
                        length = toLength(O.length),
                        index = toAbsoluteIndex(fromIndex, length);
                    if (IS_INCLUDES && el != el) {
                        for (; length > index;)
                            if ((value = O[index++]) != value) return !0
                    } else
                        for (; length > index; index++)
                            if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0; return !IS_INCLUDES && -1
                }
            };
        module.exports = {
            includes: createMethod(!0),
            indexOf: createMethod(!1)
        }
    },
    function(module, exports, __webpack_require__) {
        var has = __webpack_require__(7),
            ownKeys = __webpack_require__(53),
            getOwnPropertyDescriptorModule = __webpack_require__(11),
            definePropertyModule = __webpack_require__(5);
        module.exports = function(target, source) {
            for (var keys = ownKeys(source), defineProperty = definePropertyModule.f, getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f, i = 0; i < keys.length; i++) {
                var key = keys[i];
                has(target, key) || defineProperty(target, key, getOwnPropertyDescriptor(source, key))
            }
        }
    },
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(4),
            nativeFunctionToString = __webpack_require__(55),
            WeakMap = global.WeakMap;
        module.exports = "function" == typeof WeakMap && /native code/.test(nativeFunctionToString.call(WeakMap))
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        var $ = __webpack_require__(0),
            global = __webpack_require__(4),
            IS_PURE = __webpack_require__(32),
            DESCRIPTORS = __webpack_require__(2),
            NATIVE_SYMBOL = __webpack_require__(49),
            fails = __webpack_require__(1),
            has = __webpack_require__(7),
            isArray = __webpack_require__(48),
            isObject = __webpack_require__(3),
            anObject = __webpack_require__(9),
            toObject = __webpack_require__(6),
            toIndexedObject = __webpack_require__(10),
            toPrimitive = __webpack_require__(12),
            createPropertyDescriptor = __webpack_require__(21),
            nativeObjectCreate = __webpack_require__(47),
            objectKeys = __webpack_require__(13),
            getOwnPropertyNamesModule = __webpack_require__(30),
            getOwnPropertyNamesExternal = __webpack_require__(45),
            getOwnPropertySymbolsModule = __webpack_require__(27),
            getOwnPropertyDescriptorModule = __webpack_require__(11),
            definePropertyModule = __webpack_require__(5),
            propertyIsEnumerableModule = __webpack_require__(22),
            hide = __webpack_require__(16),
            redefine = __webpack_require__(34),
            shared = __webpack_require__(15),
            sharedKey = __webpack_require__(20),
            hiddenKeys = __webpack_require__(14),
            uid = __webpack_require__(19),
            wellKnownSymbol = __webpack_require__(8),
            wrappedWellKnownSymbolModule = __webpack_require__(44),
            defineWellKnownSymbol = __webpack_require__(98),
            setToStringTag = __webpack_require__(26),
            InternalStateModule = __webpack_require__(54),
            $forEach = __webpack_require__(97).forEach,
            HIDDEN = sharedKey("hidden"),
            TO_PRIMITIVE = wellKnownSymbol("toPrimitive"),
            setInternalState = InternalStateModule.set,
            getInternalState = InternalStateModule.getterFor("Symbol"),
            ObjectPrototype = Object.prototype,
            $Symbol = global.Symbol,
            JSON = global.JSON,
            nativeJSONStringify = JSON && JSON.stringify,
            nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f,
            nativeDefineProperty = definePropertyModule.f,
            nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f,
            nativePropertyIsEnumerable = propertyIsEnumerableModule.f,
            AllSymbols = shared("symbols"),
            ObjectPrototypeSymbols = shared("op-symbols"),
            StringToSymbolRegistry = shared("string-to-symbol-registry"),
            SymbolToStringRegistry = shared("symbol-to-string-registry"),
            WellKnownSymbolsStore = shared("wks"),
            QObject = global.QObject,
            USE_SETTER = !QObject || !QObject.prototype || !QObject.prototype.findChild,
            setSymbolDescriptor = DESCRIPTORS && fails(function() {
                return 7 != nativeObjectCreate(nativeDefineProperty({}, "a", {
                    get: function() {
                        return nativeDefineProperty(this, "a", {
                            value: 7
                        }).a
                    }
                })).a
            }) ? function(O, P, Attributes) {
                var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
                ObjectPrototypeDescriptor && delete ObjectPrototype[P], nativeDefineProperty(O, P, Attributes), ObjectPrototypeDescriptor && O !== ObjectPrototype && nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor)
            } : nativeDefineProperty,
            wrap = function(tag, description) {
                var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol.prototype);
                return setInternalState(symbol, {
                    type: "Symbol",
                    tag: tag,
                    description: description
                }), DESCRIPTORS || (symbol.description = description), symbol
            },
            isSymbol = NATIVE_SYMBOL && "symbol" == typeof $Symbol.iterator ? function(it) {
                return "symbol" == typeof it
            } : function(it) {
                return Object(it) instanceof $Symbol
            },
            $defineProperty = function(O, P, Attributes) {
                O === ObjectPrototype && $defineProperty(ObjectPrototypeSymbols, P, Attributes), anObject(O);
                var key = toPrimitive(P, !0);
                return anObject(Attributes), has(AllSymbols, key) ? (Attributes.enumerable ? (has(O, HIDDEN) && O[HIDDEN][key] && (O[HIDDEN][key] = !1), Attributes = nativeObjectCreate(Attributes, {
                    enumerable: createPropertyDescriptor(0, !1)
                })) : (has(O, HIDDEN) || nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {})), O[HIDDEN][key] = !0), setSymbolDescriptor(O, key, Attributes)) : nativeDefineProperty(O, key, Attributes)
            },
            $defineProperties = function(O, Properties) {
                anObject(O);
                var properties = toIndexedObject(Properties),
                    keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
                return $forEach(keys, function(key) {
                    DESCRIPTORS && !$propertyIsEnumerable.call(properties, key) || $defineProperty(O, key, properties[key])
                }), O
            },
            $propertyIsEnumerable = function(V) {
                var P = toPrimitive(V, !0),
                    enumerable = nativePropertyIsEnumerable.call(this, P);
                return !(this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) && (!(enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P]) || enumerable)
            },
            $getOwnPropertyDescriptor = function(O, P) {
                var it = toIndexedObject(O),
                    key = toPrimitive(P, !0);
                if (it !== ObjectPrototype || !has(AllSymbols, key) || has(ObjectPrototypeSymbols, key)) {
                    var descriptor = nativeGetOwnPropertyDescriptor(it, key);
                    return !descriptor || !has(AllSymbols, key) || has(it, HIDDEN) && it[HIDDEN][key] || (descriptor.enumerable = !0), descriptor
                }
            },
            $getOwnPropertyNames = function(O) {
                var names = nativeGetOwnPropertyNames(toIndexedObject(O)),
                    result = [];
                return $forEach(names, function(key) {
                    has(AllSymbols, key) || has(hiddenKeys, key) || result.push(key)
                }), result
            },
            $getOwnPropertySymbols = function(O) {
                var IS_OBJECT_PROTOTYPE = O === ObjectPrototype,
                    names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O)),
                    result = [];
                return $forEach(names, function(key) {
                    !has(AllSymbols, key) || IS_OBJECT_PROTOTYPE && !has(ObjectPrototype, key) || result.push(AllSymbols[key])
                }), result
            };
        NATIVE_SYMBOL || (redefine(($Symbol = function() {
            if (this instanceof $Symbol) throw TypeError("Symbol is not a constructor");
            var description = arguments.length && arguments[0] !== undefined ? String(arguments[0]) : undefined,
                tag = uid(description),
                setter = function(value) {
                    this === ObjectPrototype && setter.call(ObjectPrototypeSymbols, value), has(this, HIDDEN) && has(this[HIDDEN], tag) && (this[HIDDEN][tag] = !1), setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value))
                };
            return DESCRIPTORS && USE_SETTER && setSymbolDescriptor(ObjectPrototype, tag, {
                configurable: !0,
                set: setter
            }), wrap(tag, description)
        }).prototype, "toString", function() {
            return getInternalState(this).tag
        }), propertyIsEnumerableModule.f = $propertyIsEnumerable, definePropertyModule.f = $defineProperty, getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor, getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames, getOwnPropertySymbolsModule.f = $getOwnPropertySymbols, DESCRIPTORS && (nativeDefineProperty($Symbol.prototype, "description", {
            configurable: !0,
            get: function() {
                return getInternalState(this).description
            }
        }), IS_PURE || redefine(ObjectPrototype, "propertyIsEnumerable", $propertyIsEnumerable, {
            unsafe: !0
        })), wrappedWellKnownSymbolModule.f = function(name) {
            return wrap(wellKnownSymbol(name), name)
        }), $({
            global: !0,
            wrap: !0,
            forced: !NATIVE_SYMBOL,
            sham: !NATIVE_SYMBOL
        }, {
            Symbol: $Symbol
        }), $forEach(objectKeys(WellKnownSymbolsStore), function(name) {
            defineWellKnownSymbol(name)
        }), $({
            target: "Symbol",
            stat: !0,
            forced: !NATIVE_SYMBOL
        }, {
            "for": function(key) {
                var string = String(key);
                if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
                var symbol = $Symbol(string);
                return StringToSymbolRegistry[string] = symbol, SymbolToStringRegistry[symbol] = string, symbol
            },
            keyFor: function(sym) {
                if (!isSymbol(sym)) throw TypeError(sym + " is not a symbol");
                if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym]
            },
            useSetter: function() {
                USE_SETTER = !0
            },
            useSimple: function() {
                USE_SETTER = !1
            }
        }), $({
            target: "Object",
            stat: !0,
            forced: !NATIVE_SYMBOL,
            sham: !DESCRIPTORS
        }, {
            create: function(O, Properties) {
                return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties)
            },
            defineProperty: $defineProperty,
            defineProperties: $defineProperties,
            getOwnPropertyDescriptor: $getOwnPropertyDescriptor
        }), $({
            target: "Object",
            stat: !0,
            forced: !NATIVE_SYMBOL
        }, {
            getOwnPropertyNames: $getOwnPropertyNames,
            getOwnPropertySymbols: $getOwnPropertySymbols
        }), $({
            target: "Object",
            stat: !0,
            forced: fails(function() {
                getOwnPropertySymbolsModule.f(1)
            })
        }, {
            getOwnPropertySymbols: function(it) {
                return getOwnPropertySymbolsModule.f(toObject(it))
            }
        }), JSON && $({
            target: "JSON",
            stat: !0,
            forced: !NATIVE_SYMBOL || fails(function() {
                var symbol = $Symbol();
                return "[null]" != nativeJSONStringify([symbol]) || "{}" != nativeJSONStringify({
                    a: symbol
                }) || "{}" != nativeJSONStringify(Object(symbol))
            })
        }, {
            stringify: function(it) {
                for (var replacer, $replacer, args = [it], index = 1; arguments.length > index;) args.push(arguments[index++]);
                if ($replacer = replacer = args[1], (isObject(replacer) || it !== undefined) && !isSymbol(it)) return isArray(replacer) || (replacer = function(key, value) {
                    if ("function" == typeof $replacer && (value = $replacer.call(this, key, value)), !isSymbol(value)) return value
                }), args[1] = replacer, nativeJSONStringify.apply(JSON, args)
            }
        }), $Symbol.prototype[TO_PRIMITIVE] || hide($Symbol.prototype, TO_PRIMITIVE, $Symbol.prototype.valueOf), setToStringTag($Symbol, "Symbol"), hiddenKeys[HIDDEN] = !0
    },
    function(module, exports, __webpack_require__) {
        __webpack_require__(105), __webpack_require__(95), __webpack_require__(93), __webpack_require__(92), __webpack_require__(91), __webpack_require__(90), __webpack_require__(89), __webpack_require__(88), __webpack_require__(83), __webpack_require__(82), __webpack_require__(81), __webpack_require__(80), __webpack_require__(79), __webpack_require__(77), __webpack_require__(76), __webpack_require__(75), __webpack_require__(74), __webpack_require__(73), __webpack_require__(72), __webpack_require__(71), __webpack_require__(68), __webpack_require__(67), __webpack_require__(65), __webpack_require__(64), __webpack_require__(63), __webpack_require__(62), __webpack_require__(61), __webpack_require__(60);
        var path = __webpack_require__(31);
        module.exports = path.Object
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        __webpack_require__(106)
    },
    function(module, exports) {
        module.exports = _
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        (function(global) {
            exports.__esModule = !0, exports.loadTranslations = function(data) {
                var useInternationalizationStringChecks = !1;
                try {
                    if (data.locale_data && data.locale_data[_domain]) {
                        ! function(translations) {
                            for (var key in translations)
                                if ("" != key) {
                                    var decodedKey = _he["default"].decode(key);
                                    for (var index in decodedKey != key && (translations[decodedKey] = []), translations[key]) {
                                        var decodedValue = _he["default"].decode(translations[key][index]);
                                        translations[decodedKey][index] = decodedValue
                                    }
                                    decodedKey != key && delete translations[key]
                                }
                        }(data.locale_data[_domain]);
                        var domainConfig = data.locale_data[_domain][""];
                        domainConfig && ("true" === domainConfig.i18n_string_checks && (useInternationalizationStringChecks = !0), function(domainConfig) {
                            try {
                                domainConfig.plural_forms = _he["default"].decode(domainConfig.plural_forms)
                            } catch (e) {}
                        }(domainConfig))
                    }
                    global._jedInstance = new _jed["default"](data)
                } catch (error) {} finally {
                    useInternationalizationStringChecks && (gettext = global._jedInstance.gettext, ngettext = global._jedInstance.ngettext, global._jedInstance.gettext = function() {
                        return "✓ " + gettext.apply(global._jedInstance, arguments)
                    }, global._jedInstance.ngettext = function() {
                        return "✓ " + ngettext.apply(global._jedInstance, arguments)
                    })
                }
                var gettext, ngettext
            }, exports.gettext = function(msgid) {
                return global._jedInstance.gettext(msgid)
            }, exports.ngettext = function(singular_key, plural_key, val) {
                return global._jedInstance.ngettext(singular_key, plural_key, val)
            }, exports.format = function(template) {
                var i;
                for (i = 1; i < arguments.length; i++) template = template.replace(/%s/, arguments[i]);
                return template.replace(/%s/g, "")
            };
            var _jed = _interopRequireDefault(__webpack_require__(113)),
                _he = _interopRequireDefault(__webpack_require__(110));

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    "default": obj
                }
            }
            var _domain = "js-messages";
            global._fallbackJedInstance = new _jed["default"]({
                locale_data: {
                    "js-messages": {
                        "": {
                            domain: "js-messages",
                            lang: "en",
                            plural_forms: "nplurals=2; plural=(n != 1);",
                            implementation: "translation failure fallback"
                        }
                    }
                },
                domain: "js-messages"
            }), global._jedInstance = global._fallbackJedInstance
        }).call(this, __webpack_require__(59))
    },
    function(module, exports) {
        module.exports = he
    },
    function(module, exports) {
        module.exports = Backbone
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = !0, exports.isIndeterminateServerError = function(response) {
            return "error" === response.xhr.statusText && "" === response.message
        }, exports.request = request, exports.get = function(url, data) {
            return request(GET, url, data)
        }, exports.post = function(url, data) {
            return request(POST, url, data)
        }, exports.postJSON = function(url, data) {
            return request(POST, url, JSON.stringify(data), {
                dataType: "json",
                contentType: "application/json; charset=UTF-8"
            })
        }, exports.HTTPRawRequest = exports.HTTPFailure = exports.HTTPError = exports.SCHEME_REGEX = exports.STAT_FAIL = exports.STAT_OK = exports.POST = exports.GET = void 0;
        var obj, _jquery = (obj = __webpack_require__(37)) && obj.__esModule ? obj : {
                "default": obj
            },
            _util = __webpack_require__(114);
        var GET = "GET";
        exports.GET = GET;
        var POST = "POST";
        exports.POST = POST;
        var STAT_OK = "OK";
        exports.STAT_OK = STAT_OK;
        exports.STAT_FAIL = "FAIL";
        exports.SCHEME_REGEX = /(^[\w-]+:|^)\/\//;
        var HTTPError = function(method, url, error, xhr) {
            this.message = error, this.method = method, this.url = url, this.error = error, this.xhr = xhr
        };
        exports.HTTPError = HTTPError, HTTPError.prototype = Error.prototype;
        var HTTPFailure = function(method, url, response, xhr) {
            this.message = response.message, this.method = method, this.url = url, this.xhr = xhr, this.response = response
        };
        exports.HTTPFailure = HTTPFailure, HTTPFailure.prototype = Error.prototype;
        var HTTPRawRequest = function(jqueryContext, xhr) {
            this.context = jqueryContext, this.xhr = xhr
        };

        function request(method, url, data, additionalOptions, returnRawRequest) {
            void 0 === returnRawRequest && (returnRawRequest = !1);
            var dfd = new _jquery["default"].Deferred,
                defaultOptions = {
                    data: data,
                    dataType: "text",
                    method: method
                },
                options = _jquery["default"].extend(defaultOptions, additionalOptions),
                request = _jquery["default"].ajax(url, options);
            request.then(function(res, status, xhr) {
                if (returnRawRequest) dfd.resolve(new HTTPRawRequest(this, xhr));
                else {
                    var parsedRes;
                    if ("string" == typeof res) try {
                        parsedRes = _jquery["default"].parseJSON(res)
                    } catch (e) {
                        dfd.reject(new HTTPError(method, url, "Unable to parse response string as JSON.", xhr))
                    } else parsedRes = res;
                    parsedRes !== undefined ? parsedRes.stat !== undefined ? parsedRes.stat === STAT_OK ? "response" in parsedRes ? dfd.resolve((0, _util.safeDecodeJSON)(parsedRes.response)) : dfd.resolve((0, _util.safeDecodeJSON)(parsedRes)) : dfd.reject(new HTTPFailure(method, url, (0, _util.safeDecodeJSON)(parsedRes), xhr)) : dfd.reject(new HTTPError(method, url, "Stat attribute is undefined.", xhr)) : dfd.reject(new HTTPError(method, url, "Response is undefined.", xhr))
                }
            }).fail(function(xhr, status, error) {
                dfd.reject(new HTTPError(method, url, error, xhr))
            });
            var promise = dfd.promise();
            return promise.abort = request.abort, promise
        }
        exports.HTTPRawRequest = HTTPRawRequest
    },
    function(module, exports, __webpack_require__) {
        /**
         * @preserve jed.js https://github.com/SlexAxton/Jed
         */
        ! function(root, undef) {
            var ArrayProto = Array.prototype,
                ObjProto = Object.prototype,
                slice = ArrayProto.slice,
                hasOwnProp = ObjProto.hasOwnProperty,
                nativeForEach = ArrayProto.forEach,
                breaker = {},
                _ = {
                    forEach: function(obj, iterator, context) {
                        var i, l, key;
                        if (null !== obj)
                            if (nativeForEach && obj.forEach === nativeForEach) obj.forEach(iterator, context);
                            else if (obj.length === +obj.length) {
                            for (i = 0, l = obj.length; i < l; i++)
                                if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return
                        } else
                            for (key in obj)
                                if (hasOwnProp.call(obj, key) && iterator.call(context, obj[key], key, obj) === breaker) return
                    },
                    extend: function(obj) {
                        return this.forEach(slice.call(arguments, 1), function(source) {
                            for (var prop in source) obj[prop] = source[prop]
                        }), obj
                    }
                },
                Jed = function(options) {
                    if (this.defaults = {
                        locale_data: {
                            messages: {
                                "": {
                                    domain: "messages",
                                    lang: "en",
                                    plural_forms: "nplurals=2; plural=(n != 1);"
                                }
                            }
                        },
                        domain: "messages",
                        debug: !1
                    }, this.options = _.extend({}, this.defaults, options), this.textdomain(this.options.domain), options.domain && !this.options.locale_data[this.options.domain]) throw new Error("Text domain set to non-existent domain: `" + options.domain + "`")
                };

            function getPluralFormFunc(plural_form_string) {
                return Jed.PF.compile(plural_form_string || "nplurals=2; plural=(n != 1);")
            }

            function Chain(key, i18n) {
                this._key = key, this._i18n = i18n
            }
            Jed.context_delimiter = String.fromCharCode(4), _.extend(Chain.prototype, {
                onDomain: function(domain) {
                    return this._domain = domain, this
                },
                withContext: function(context) {
                    return this._context = context, this
                },
                ifPlural: function(num, pkey) {
                    return this._val = num, this._pkey = pkey, this
                },
                fetch: function(sArr) {
                    return "[object Array]" != {}.toString.call(sArr) && (sArr = [].slice.call(arguments, 0)), (sArr && sArr.length ? Jed.sprintf : function(x) {
                        return x
                    })(this._i18n.dcnpgettext(this._domain, this._context, this._key, this._pkey, this._val), sArr)
                }
            }), _.extend(Jed.prototype, {
                translate: function(key) {
                    return new Chain(key, this)
                },
                textdomain: function(domain) {
                    if (!domain) return this._textdomain;
                    this._textdomain = domain
                },
                gettext: function(key) {
                    return this.dcnpgettext.call(this, void 0, void 0, key)
                },
                dgettext: function(domain, key) {
                    return this.dcnpgettext.call(this, domain, void 0, key)
                },
                dcgettext: function(domain, key) {
                    return this.dcnpgettext.call(this, domain, void 0, key)
                },
                ngettext: function(skey, pkey, val) {
                    return this.dcnpgettext.call(this, void 0, void 0, skey, pkey, val)
                },
                dngettext: function(domain, skey, pkey, val) {
                    return this.dcnpgettext.call(this, domain, void 0, skey, pkey, val)
                },
                dcngettext: function(domain, skey, pkey, val) {
                    return this.dcnpgettext.call(this, domain, void 0, skey, pkey, val)
                },
                pgettext: function(context, key) {
                    return this.dcnpgettext.call(this, void 0, context, key)
                },
                dpgettext: function(domain, context, key) {
                    return this.dcnpgettext.call(this, domain, context, key)
                },
                dcpgettext: function(domain, context, key) {
                    return this.dcnpgettext.call(this, domain, context, key)
                },
                npgettext: function(context, skey, pkey, val) {
                    return this.dcnpgettext.call(this, void 0, context, skey, pkey, val)
                },
                dnpgettext: function(domain, context, skey, pkey, val) {
                    return this.dcnpgettext.call(this, domain, context, skey, pkey, val)
                },
                dcnpgettext: function(domain, context, singular_key, plural_key, val) {
                    var fallback;
                    if (plural_key = plural_key || singular_key, domain = domain || this._textdomain, !this.options) return (fallback = new Jed).dcnpgettext.call(fallback, undefined, undefined, singular_key, plural_key, val);
                    if (!this.options.locale_data) throw new Error("No locale data provided.");
                    if (!this.options.locale_data[domain]) throw new Error("Domain `" + domain + "` was not found.");
                    if (!this.options.locale_data[domain][""]) throw new Error("No locale meta information provided.");
                    if (!singular_key) throw new Error("No translation key found.");
                    var val_list, res, val_idx, key = context ? context + Jed.context_delimiter + singular_key : singular_key,
                        locale_data = this.options.locale_data,
                        dict = locale_data[domain],
                        defaultConf = (locale_data.messages || this.defaults.locale_data.messages)[""],
                        pluralForms = dict[""].plural_forms || dict[""]["Plural-Forms"] || dict[""]["plural-forms"] || defaultConf.plural_forms || defaultConf["Plural-Forms"] || defaultConf["plural-forms"];
                    if (val === undefined) val_idx = 0;
                    else {
                        if ("number" != typeof val && (val = parseInt(val, 10), isNaN(val))) throw new Error("The number that was passed in is not a number.");
                        val_idx = getPluralFormFunc(pluralForms)(val)
                    } if (!dict) throw new Error("No domain named `" + domain + "` could be found.");
                    return !(val_list = dict[key]) || val_idx > val_list.length ? (this.options.missing_key_callback && this.options.missing_key_callback(key, domain), res = [singular_key, plural_key], !0 === this.options.debug && console.log(res[getPluralFormFunc(pluralForms)(val)]), res[getPluralFormFunc()(val)]) : (res = val_list[val_idx]) || (res = [singular_key, plural_key])[getPluralFormFunc()(val)]
                }
            });
            var parser, lexer, sprintf = function() {
                function get_type(variable) {
                    return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase()
                }

                function str_repeat(input, multiplier) {
                    for (var output = []; multiplier > 0; output[--multiplier] = input);
                    return output.join("")
                }
                var str_format = function() {
                    return str_format.cache.hasOwnProperty(arguments[0]) || (str_format.cache[arguments[0]] = str_format.parse(arguments[0])), str_format.format.call(null, str_format.cache[arguments[0]], arguments)
                };
                return str_format.format = function(parse_tree, argv) {
                    var arg, i, k, match, pad, pad_character, pad_length, cursor = 1,
                        tree_length = parse_tree.length,
                        node_type = "",
                        output = [];
                    for (i = 0; i < tree_length; i++)
                        if ("string" === (node_type = get_type(parse_tree[i]))) output.push(parse_tree[i]);
                        else if ("array" === node_type) {
                        if ((match = parse_tree[i])[2])
                            for (arg = argv[cursor], k = 0; k < match[2].length; k++) {
                                if (!arg.hasOwnProperty(match[2][k])) throw sprintf('[sprintf] property "%s" does not exist', match[2][k]);
                                arg = arg[match[2][k]]
                            } else arg = match[1] ? argv[match[1]] : argv[cursor++];
                        if (/[^s]/.test(match[8]) && "number" != get_type(arg)) throw sprintf("[sprintf] expecting number but found %s", get_type(arg));
                        switch (null == arg && (arg = ""), match[8]) {
                            case "b":
                                arg = arg.toString(2);
                                break;
                            case "c":
                                arg = String.fromCharCode(arg);
                                break;
                            case "d":
                                arg = parseInt(arg, 10);
                                break;
                            case "e":
                                arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential();
                                break;
                            case "f":
                                arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg);
                                break;
                            case "o":
                                arg = arg.toString(8);
                                break;
                            case "s":
                                arg = (arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg;
                                break;
                            case "u":
                                arg = Math.abs(arg);
                                break;
                            case "x":
                                arg = arg.toString(16);
                                break;
                            case "X":
                                arg = arg.toString(16).toUpperCase()
                        }
                        arg = /[def]/.test(match[8]) && match[3] && arg >= 0 ? "+" + arg : arg, pad_character = match[4] ? "0" == match[4] ? "0" : match[4].charAt(1) : " ", pad_length = match[6] - String(arg).length, pad = match[6] ? str_repeat(pad_character, pad_length) : "", output.push(match[5] ? arg + pad : pad + arg)
                    }
                    return output.join("")
                }, str_format.cache = {}, str_format.parse = function(fmt) {
                    for (var _fmt = fmt, match = [], parse_tree = [], arg_names = 0; _fmt;) {
                        if (null !== (match = /^[^%]+/.exec(_fmt))) parse_tree.push(match[0]);
                        else if (null !== (match = /^%{2}/.exec(_fmt))) parse_tree.push("%");
                        else {
                            if (null === (match = /^%(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt))) throw "[sprintf] huh?";
                            if (match[2]) {
                                arg_names |= 1;
                                var field_list = [],
                                    replacement_field = match[2],
                                    field_match = [];
                                if (null === (field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field))) throw "[sprintf] huh?";
                                for (field_list.push(field_match[1]);
                                    "" !== (replacement_field = replacement_field.substring(field_match[0].length));)
                                    if (null !== (field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field))) field_list.push(field_match[1]);
                                    else {
                                        if (null === (field_match = /^\[(\d+)\]/.exec(replacement_field))) throw "[sprintf] huh?";
                                        field_list.push(field_match[1])
                                    }
                                match[2] = field_list
                            } else arg_names |= 2; if (3 === arg_names) throw "[sprintf] mixing positional and named placeholders is not (yet) supported";
                            parse_tree.push(match)
                        }
                        _fmt = _fmt.substring(match[0].length)
                    }
                    return parse_tree
                }, str_format
            }();
            Jed.parse_plural = function(plural_forms, n) {
                return plural_forms = plural_forms.replace(/n/g, n), Jed.parse_expression(plural_forms)
            }, Jed.sprintf = function(fmt, args) {
                return "[object Array]" == {}.toString.call(args) ? function(fmt, argv) {
                    return argv.unshift(fmt), sprintf.apply(null, argv)
                }(fmt, [].slice.call(args)) : sprintf.apply(this, [].slice.call(arguments))
            }, Jed.prototype.sprintf = function() {
                return Jed.sprintf.apply(this, arguments)
            }, Jed.PF = {}, Jed.PF.parse = function(p) {
                var plural_str = Jed.PF.extractPluralExpr(p);
                return Jed.PF.parser.parse.call(Jed.PF.parser, plural_str)
            }, Jed.PF.compile = function(p) {
                var ast = Jed.PF.parse(p);
                return function(n) {
                    return !0 === (val = Jed.PF.interpreter(ast)(n)) ? 1 : val || 0;
                    var val
                }
            }, Jed.PF.interpreter = function(ast) {
                return function(n) {
                    switch (ast.type) {
                        case "GROUP":
                            return Jed.PF.interpreter(ast.expr)(n);
                        case "TERNARY":
                            return Jed.PF.interpreter(ast.expr)(n) ? Jed.PF.interpreter(ast.truthy)(n) : Jed.PF.interpreter(ast.falsey)(n);
                        case "OR":
                            return Jed.PF.interpreter(ast.left)(n) || Jed.PF.interpreter(ast.right)(n);
                        case "AND":
                            return Jed.PF.interpreter(ast.left)(n) && Jed.PF.interpreter(ast.right)(n);
                        case "LT":
                            return Jed.PF.interpreter(ast.left)(n) < Jed.PF.interpreter(ast.right)(n);
                        case "GT":
                            return Jed.PF.interpreter(ast.left)(n) > Jed.PF.interpreter(ast.right)(n);
                        case "LTE":
                            return Jed.PF.interpreter(ast.left)(n) <= Jed.PF.interpreter(ast.right)(n);
                        case "GTE":
                            return Jed.PF.interpreter(ast.left)(n) >= Jed.PF.interpreter(ast.right)(n);
                        case "EQ":
                            return Jed.PF.interpreter(ast.left)(n) == Jed.PF.interpreter(ast.right)(n);
                        case "NEQ":
                            return Jed.PF.interpreter(ast.left)(n) != Jed.PF.interpreter(ast.right)(n);
                        case "MOD":
                            return Jed.PF.interpreter(ast.left)(n) % Jed.PF.interpreter(ast.right)(n);
                        case "VAR":
                            return n;
                        case "NUM":
                            return ast.val;
                        default:
                            throw new Error("Invalid Token found.")
                    }
                }
            }, Jed.PF.extractPluralExpr = function(p) {
                p = p.replace(/^\s\s*/, "").replace(/\s\s*$/, ""), /;\s*$/.test(p) || (p = p.concat(";"));
                var plural_matches, nplurals_re = /nplurals\=(\d+);/,
                    nplurals_matches = p.match(nplurals_re);
                if (!(nplurals_matches.length > 1)) throw new Error("nplurals not found in plural_forms string: " + p);
                if (nplurals_matches[1], !((plural_matches = (p = p.replace(nplurals_re, "")).match(/plural\=(.*);/)) && plural_matches.length > 1)) throw new Error("`plural` expression not found: " + p);
                return plural_matches[1]
            }, Jed.PF.parser = (parser = {
                trace: function() {},
                yy: {},
                symbols_: {
                    error: 2,
                    expressions: 3,
                    e: 4,
                    EOF: 5,
                    "?": 6,
                    ":": 7,
                    "||": 8,
                    "&&": 9,
                    "<": 10,
                    "<=": 11,
                    ">": 12,
                    ">=": 13,
                    "!=": 14,
                    "==": 15,
                    "%": 16,
                    "(": 17,
                    ")": 18,
                    n: 19,
                    NUMBER: 20,
                    $accept: 0,
                    $end: 1
                },
                terminals_: {
                    2: "error",
                    5: "EOF",
                    6: "?",
                    7: ":",
                    8: "||",
                    9: "&&",
                    10: "<",
                    11: "<=",
                    12: ">",
                    13: ">=",
                    14: "!=",
                    15: "==",
                    16: "%",
                    17: "(",
                    18: ")",
                    19: "n",
                    20: "NUMBER"
                },
                productions_: [0, [3, 2],
                    [4, 5],
                    [4, 3],
                    [4, 3],
                    [4, 3],
                    [4, 3],
                    [4, 3],
                    [4, 3],
                    [4, 3],
                    [4, 3],
                    [4, 3],
                    [4, 3],
                    [4, 1],
                    [4, 1]
                ],
                performAction: function(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
                    var $0 = $$.length - 1;
                    switch (yystate) {
                        case 1:
                            return {
                                type: "GROUP",
                                expr: $$[$0 - 1]
                            };
                        case 2:
                            this.$ = {
                                type: "TERNARY",
                                expr: $$[$0 - 4],
                                truthy: $$[$0 - 2],
                                falsey: $$[$0]
                            };
                            break;
                        case 3:
                            this.$ = {
                                type: "OR",
                                left: $$[$0 - 2],
                                right: $$[$0]
                            };
                            break;
                        case 4:
                            this.$ = {
                                type: "AND",
                                left: $$[$0 - 2],
                                right: $$[$0]
                            };
                            break;
                        case 5:
                            this.$ = {
                                type: "LT",
                                left: $$[$0 - 2],
                                right: $$[$0]
                            };
                            break;
                        case 6:
                            this.$ = {
                                type: "LTE",
                                left: $$[$0 - 2],
                                right: $$[$0]
                            };
                            break;
                        case 7:
                            this.$ = {
                                type: "GT",
                                left: $$[$0 - 2],
                                right: $$[$0]
                            };
                            break;
                        case 8:
                            this.$ = {
                                type: "GTE",
                                left: $$[$0 - 2],
                                right: $$[$0]
                            };
                            break;
                        case 9:
                            this.$ = {
                                type: "NEQ",
                                left: $$[$0 - 2],
                                right: $$[$0]
                            };
                            break;
                        case 10:
                            this.$ = {
                                type: "EQ",
                                left: $$[$0 - 2],
                                right: $$[$0]
                            };
                            break;
                        case 11:
                            this.$ = {
                                type: "MOD",
                                left: $$[$0 - 2],
                                right: $$[$0]
                            };
                            break;
                        case 12:
                            this.$ = {
                                type: "GROUP",
                                expr: $$[$0 - 1]
                            };
                            break;
                        case 13:
                            this.$ = {
                                type: "VAR"
                            };
                            break;
                        case 14:
                            this.$ = {
                                type: "NUM",
                                val: Number(yytext)
                            }
                    }
                },
                table: [{
                    3: 1,
                    4: 2,
                    17: [1, 3],
                    19: [1, 4],
                    20: [1, 5]
                }, {
                    1: [3]
                }, {
                    5: [1, 6],
                    6: [1, 7],
                    8: [1, 8],
                    9: [1, 9],
                    10: [1, 10],
                    11: [1, 11],
                    12: [1, 12],
                    13: [1, 13],
                    14: [1, 14],
                    15: [1, 15],
                    16: [1, 16]
                }, {
                    4: 17,
                    17: [1, 3],
                    19: [1, 4],
                    20: [1, 5]
                }, {
                    5: [2, 13],
                    6: [2, 13],
                    7: [2, 13],
                    8: [2, 13],
                    9: [2, 13],
                    10: [2, 13],
                    11: [2, 13],
                    12: [2, 13],
                    13: [2, 13],
                    14: [2, 13],
                    15: [2, 13],
                    16: [2, 13],
                    18: [2, 13]
                }, {
                    5: [2, 14],
                    6: [2, 14],
                    7: [2, 14],
                    8: [2, 14],
                    9: [2, 14],
                    10: [2, 14],
                    11: [2, 14],
                    12: [2, 14],
                    13: [2, 14],
                    14: [2, 14],
                    15: [2, 14],
                    16: [2, 14],
                    18: [2, 14]
                }, {
                    1: [2, 1]
                }, {
                    4: 18,
                    17: [1, 3],
                    19: [1, 4],
                    20: [1, 5]
                }, {
                    4: 19,
                    17: [1, 3],
                    19: [1, 4],
                    20: [1, 5]
                }, {
                    4: 20,
                    17: [1, 3],
                    19: [1, 4],
                    20: [1, 5]
                }, {
                    4: 21,
                    17: [1, 3],
                    19: [1, 4],
                    20: [1, 5]
                }, {
                    4: 22,
                    17: [1, 3],
                    19: [1, 4],
                    20: [1, 5]
                }, {
                    4: 23,
                    17: [1, 3],
                    19: [1, 4],
                    20: [1, 5]
                }, {
                    4: 24,
                    17: [1, 3],
                    19: [1, 4],
                    20: [1, 5]
                }, {
                    4: 25,
                    17: [1, 3],
                    19: [1, 4],
                    20: [1, 5]
                }, {
                    4: 26,
                    17: [1, 3],
                    19: [1, 4],
                    20: [1, 5]
                }, {
                    4: 27,
                    17: [1, 3],
                    19: [1, 4],
                    20: [1, 5]
                }, {
                    6: [1, 7],
                    8: [1, 8],
                    9: [1, 9],
                    10: [1, 10],
                    11: [1, 11],
                    12: [1, 12],
                    13: [1, 13],
                    14: [1, 14],
                    15: [1, 15],
                    16: [1, 16],
                    18: [1, 28]
                }, {
                    6: [1, 7],
                    7: [1, 29],
                    8: [1, 8],
                    9: [1, 9],
                    10: [1, 10],
                    11: [1, 11],
                    12: [1, 12],
                    13: [1, 13],
                    14: [1, 14],
                    15: [1, 15],
                    16: [1, 16]
                }, {
                    5: [2, 3],
                    6: [2, 3],
                    7: [2, 3],
                    8: [2, 3],
                    9: [1, 9],
                    10: [1, 10],
                    11: [1, 11],
                    12: [1, 12],
                    13: [1, 13],
                    14: [1, 14],
                    15: [1, 15],
                    16: [1, 16],
                    18: [2, 3]
                }, {
                    5: [2, 4],
                    6: [2, 4],
                    7: [2, 4],
                    8: [2, 4],
                    9: [2, 4],
                    10: [1, 10],
                    11: [1, 11],
                    12: [1, 12],
                    13: [1, 13],
                    14: [1, 14],
                    15: [1, 15],
                    16: [1, 16],
                    18: [2, 4]
                }, {
                    5: [2, 5],
                    6: [2, 5],
                    7: [2, 5],
                    8: [2, 5],
                    9: [2, 5],
                    10: [2, 5],
                    11: [2, 5],
                    12: [2, 5],
                    13: [2, 5],
                    14: [2, 5],
                    15: [2, 5],
                    16: [1, 16],
                    18: [2, 5]
                }, {
                    5: [2, 6],
                    6: [2, 6],
                    7: [2, 6],
                    8: [2, 6],
                    9: [2, 6],
                    10: [2, 6],
                    11: [2, 6],
                    12: [2, 6],
                    13: [2, 6],
                    14: [2, 6],
                    15: [2, 6],
                    16: [1, 16],
                    18: [2, 6]
                }, {
                    5: [2, 7],
                    6: [2, 7],
                    7: [2, 7],
                    8: [2, 7],
                    9: [2, 7],
                    10: [2, 7],
                    11: [2, 7],
                    12: [2, 7],
                    13: [2, 7],
                    14: [2, 7],
                    15: [2, 7],
                    16: [1, 16],
                    18: [2, 7]
                }, {
                    5: [2, 8],
                    6: [2, 8],
                    7: [2, 8],
                    8: [2, 8],
                    9: [2, 8],
                    10: [2, 8],
                    11: [2, 8],
                    12: [2, 8],
                    13: [2, 8],
                    14: [2, 8],
                    15: [2, 8],
                    16: [1, 16],
                    18: [2, 8]
                }, {
                    5: [2, 9],
                    6: [2, 9],
                    7: [2, 9],
                    8: [2, 9],
                    9: [2, 9],
                    10: [2, 9],
                    11: [2, 9],
                    12: [2, 9],
                    13: [2, 9],
                    14: [2, 9],
                    15: [2, 9],
                    16: [1, 16],
                    18: [2, 9]
                }, {
                    5: [2, 10],
                    6: [2, 10],
                    7: [2, 10],
                    8: [2, 10],
                    9: [2, 10],
                    10: [2, 10],
                    11: [2, 10],
                    12: [2, 10],
                    13: [2, 10],
                    14: [2, 10],
                    15: [2, 10],
                    16: [1, 16],
                    18: [2, 10]
                }, {
                    5: [2, 11],
                    6: [2, 11],
                    7: [2, 11],
                    8: [2, 11],
                    9: [2, 11],
                    10: [2, 11],
                    11: [2, 11],
                    12: [2, 11],
                    13: [2, 11],
                    14: [2, 11],
                    15: [2, 11],
                    16: [2, 11],
                    18: [2, 11]
                }, {
                    5: [2, 12],
                    6: [2, 12],
                    7: [2, 12],
                    8: [2, 12],
                    9: [2, 12],
                    10: [2, 12],
                    11: [2, 12],
                    12: [2, 12],
                    13: [2, 12],
                    14: [2, 12],
                    15: [2, 12],
                    16: [2, 12],
                    18: [2, 12]
                }, {
                    4: 30,
                    17: [1, 3],
                    19: [1, 4],
                    20: [1, 5]
                }, {
                    5: [2, 2],
                    6: [1, 7],
                    7: [2, 2],
                    8: [1, 8],
                    9: [1, 9],
                    10: [1, 10],
                    11: [1, 11],
                    12: [1, 12],
                    13: [1, 13],
                    14: [1, 14],
                    15: [1, 15],
                    16: [1, 16],
                    18: [2, 2]
                }],
                defaultActions: {
                    6: [2, 1]
                },
                parseError: function(str, hash) {
                    throw new Error(str)
                },
                parse: function(input) {
                    var self = this,
                        stack = [0],
                        vstack = [null],
                        lstack = [],
                        table = this.table,
                        yytext = "",
                        yylineno = 0,
                        yyleng = 0,
                        recovering = 0;
                    this.lexer.setInput(input), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, "undefined" == typeof this.lexer.yylloc && (this.lexer.yylloc = {});
                    var yyloc = this.lexer.yylloc;

                    function lex() {
                        var token;
                        return "number" != typeof(token = self.lexer.lex() || 1) && (token = self.symbols_[token] || token), token
                    }
                    lstack.push(yyloc), "function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError);
                    for (var symbol, preErrorSymbol, state, action, r, p, len, newState, expected, n, yyval = {};;) {
                        if (state = stack[stack.length - 1], this.defaultActions[state] ? action = this.defaultActions[state] : (null == symbol && (symbol = lex()), action = table[state] && table[state][symbol]), void 0 === action || !action.length || !action[0]) {
                            if (!recovering) {
                                for (p in expected = [], table[state]) this.terminals_[p] && p > 2 && expected.push("'" + this.terminals_[p] + "'");
                                var errStr = "";
                                errStr = this.lexer.showPosition ? "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + this.terminals_[symbol] + "'" : "Parse error on line " + (yylineno + 1) + ": Unexpected " + (1 == symbol ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'"), this.parseError(errStr, {
                                    text: this.lexer.match,
                                    token: this.terminals_[symbol] || symbol,
                                    line: this.lexer.yylineno,
                                    loc: yyloc,
                                    expected: expected
                                })
                            }
                            if (3 == recovering) {
                                if (1 == symbol) throw new Error(errStr || "Parsing halted.");
                                yyleng = this.lexer.yyleng, yytext = this.lexer.yytext, yylineno = this.lexer.yylineno, yyloc = this.lexer.yylloc, symbol = lex()
                            }
                            for (; !(2..toString() in table[state]);) {
                                if (0 == state) throw new Error(errStr || "Parsing halted.");
                                n = 1, stack.length = stack.length - 2 * n, vstack.length = vstack.length - n, lstack.length = lstack.length - n, state = stack[stack.length - 1]
                            }
                            preErrorSymbol = symbol, symbol = 2, action = table[state = stack[stack.length - 1]] && table[state][2], recovering = 3
                        }
                        if (action[0] instanceof Array && action.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
                        switch (action[0]) {
                            case 1:
                                stack.push(symbol), vstack.push(this.lexer.yytext), lstack.push(this.lexer.yylloc), stack.push(action[1]), symbol = null, preErrorSymbol ? (symbol = preErrorSymbol, preErrorSymbol = null) : (yyleng = this.lexer.yyleng, yytext = this.lexer.yytext, yylineno = this.lexer.yylineno, yyloc = this.lexer.yylloc, recovering > 0 && recovering--);
                                break;
                            case 2:
                                if (len = this.productions_[action[1]][1], yyval.$ = vstack[vstack.length - len], yyval._$ = {
                                    first_line: lstack[lstack.length - (len || 1)].first_line,
                                    last_line: lstack[lstack.length - 1].last_line,
                                    first_column: lstack[lstack.length - (len || 1)].first_column,
                                    last_column: lstack[lstack.length - 1].last_column
                                }, void 0 !== (r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack))) return r;
                                len && (stack = stack.slice(0, -1 * len * 2), vstack = vstack.slice(0, -1 * len), lstack = lstack.slice(0, -1 * len)), stack.push(this.productions_[action[1]][0]), vstack.push(yyval.$), lstack.push(yyval._$), newState = table[stack[stack.length - 2]][stack[stack.length - 1]], stack.push(newState);
                                break;
                            case 3:
                                return !0
                        }
                    }
                    return !0
                }
            }, lexer = function() {
                var lexer = {
                    EOF: 1,
                    parseError: function(str, hash) {
                        if (!this.yy.parseError) throw new Error(str);
                        this.yy.parseError(str, hash)
                    },
                    setInput: function(input) {
                        return this._input = input, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
                            first_line: 1,
                            first_column: 0,
                            last_line: 1,
                            last_column: 0
                        }, this
                    },
                    input: function() {
                        var ch = this._input[0];
                        return this.yytext += ch, this.yyleng++, this.match += ch, this.matched += ch, ch.match(/\n/) && this.yylineno++, this._input = this._input.slice(1), ch
                    },
                    unput: function(ch) {
                        return this._input = ch + this._input, this
                    },
                    more: function() {
                        return this._more = !0, this
                    },
                    pastInput: function() {
                        var past = this.matched.substr(0, this.matched.length - this.match.length);
                        return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "")
                    },
                    upcomingInput: function() {
                        var next = this.match;
                        return next.length < 20 && (next += this._input.substr(0, 20 - next.length)), (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "")
                    },
                    showPosition: function() {
                        var pre = this.pastInput(),
                            c = new Array(pre.length + 1).join("-");
                        return pre + this.upcomingInput() + "\n" + c + "^"
                    },
                    next: function() {
                        if (this.done) return this.EOF;
                        var match, lines;
                        this._input || (this.done = !0), this._more || (this.yytext = "", this.match = "");
                        for (var rules = this._currentRules(), i = 0; i < rules.length; i++)
                            if (match = this._input.match(this.rules[rules[i]])) return (lines = match[0].match(/\n.*/g)) && (this.yylineno += lines.length), this.yylloc = {
                                first_line: this.yylloc.last_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.last_column,
                                last_column: lines ? lines[lines.length - 1].length - 1 : this.yylloc.last_column + match[0].length
                            }, this.yytext += match[0], this.match += match[0], this.matches = match, this.yyleng = this.yytext.length, this._more = !1, this._input = this._input.slice(match[0].length), this.matched += match[0], this.performAction.call(this, this.yy, this, rules[i], this.conditionStack[this.conditionStack.length - 1]) || void 0;
                        if ("" === this._input) return this.EOF;
                        this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                            text: "",
                            token: null,
                            line: this.yylineno
                        })
                    },
                    lex: function() {
                        var r = this.next();
                        return void 0 !== r ? r : this.lex()
                    },
                    begin: function(condition) {
                        this.conditionStack.push(condition)
                    },
                    popState: function() {
                        return this.conditionStack.pop()
                    },
                    _currentRules: function() {
                        return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
                    },
                    topState: function() {
                        return this.conditionStack[this.conditionStack.length - 2]
                    },
                    pushState: function(condition) {
                        this.begin(condition)
                    },
                    performAction: function(yy, yy_, $avoiding_name_collisions, YY_START) {
                        switch ($avoiding_name_collisions) {
                            case 0:
                                break;
                            case 1:
                                return 20;
                            case 2:
                                return 19;
                            case 3:
                                return 8;
                            case 4:
                                return 9;
                            case 5:
                                return 6;
                            case 6:
                                return 7;
                            case 7:
                                return 11;
                            case 8:
                                return 13;
                            case 9:
                                return 10;
                            case 10:
                                return 12;
                            case 11:
                                return 14;
                            case 12:
                                return 15;
                            case 13:
                                return 16;
                            case 14:
                                return 17;
                            case 15:
                                return 18;
                            case 16:
                                return 5;
                            case 17:
                                return "INVALID"
                        }
                    },
                    rules: [/^\s+/, /^[0-9]+(\.[0-9]+)?\b/, /^n\b/, /^\|\|/, /^&&/, /^\?/, /^:/, /^<=/, /^>=/, /^</, /^>/, /^!=/, /^==/, /^%/, /^\(/, /^\)/, /^$/, /^./],
                    conditions: {
                        INITIAL: {
                            rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                            inclusive: !0
                        }
                    }
                };
                return lexer
            }(), parser.lexer = lexer, parser), void 0 !== module && module.exports && (exports = module.exports = Jed), exports.Jed = Jed
        }()
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = !0, exports.safeDecode = safeDecode, exports.uniqueId = function(prefix) {
            void 0 === prefix && (prefix = "");
            var id = idCounter++;
            return "" + prefix + id
        }, exports.safeDecodeJSON = function safeDecodeJSON(json) {
            if (_lodash["default"].isNull(json) || _lodash["default"].isNumber(json) || _lodash["default"].isBoolean(json)) return json;
            if (_lodash["default"].isString(json)) return safeDecode(json);
            if (_lodash["default"].isArray(json)) return _lodash["default"].map(json, safeDecodeJSON);
            if (_lodash["default"].isObject(json)) return _lodash["default"].transform(json, function(result, value, key) {
                result[_he["default"].decode(key)] = safeDecodeJSON(value)
            });
            return null
        }, exports.getQueryParams = function(queryString) {
            if (!queryString) return {};
            return _lodash["default"].chain(queryString.split("&")).map(function(params) {
                var p = params.split("=");
                return [p[0], decodeURIComponent(p[1])]
            }).object().value()
        }, exports.serializeQueryParams = function(params) {
            var parts = [];

            function serializeKey(key) {
                for (var _len = arguments.length, path = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) path[_key - 1] = arguments[_key];
                return "" + key + path.map(function(p) {
                    return "%5B" + encodeURIComponent(p) + "%5D"
                }).join("")
            }
            return Object.keys(params || {}).forEach(function(key) {
                ! function traverse(obj) {
                    for (var _len2 = arguments.length, path = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) path[_key2 - 1] = arguments[_key2];
                    _lodash["default"].isArray(obj) ? obj.forEach(function(value) {
                        parts.push(serializeKey.apply(void 0, [key].concat(path)) + "%5B%5D=" + encodeURIComponent(value))
                    }) : _lodash["default"].isObject(obj) ? Object.keys(obj).forEach(function(k) {
                        traverse.apply(void 0, [obj[k]].concat(path, [k]))
                    }) : parts.push(serializeKey.apply(void 0, [key].concat(path)) + "=" + encodeURIComponent(obj))
                }(params[key])
            }), parts.join("&")
        }, exports.noop = function() {}, exports.isValidUsername = exports.nestedSet = exports.LOCAL_STORAGE_TEST_VALUE = exports.isLocalStorageSupported = exports.cleanFilterState = exports.createMinutesList = exports.createTimeList = exports.getDeniedCount = exports.getSuccessCount = exports.deniedAuthTimeseriesDataFormatter = exports.authTimeseriesDataFormatter = exports.joinList = void 0;
        var _lodash = _interopRequireDefault(__webpack_require__(108)),
            _he = _interopRequireDefault(__webpack_require__(110));

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }

        function safeDecode(val) {
            try {
                return _he["default"].decode(val)
            } catch (err) {
                return ""
            }
        }
        var idCounter = 0;
        exports.joinList = function(list, conjunction) {
            if (void 0 === conjunction && (conjunction = "and"), 1 === list.length) return list[0];
            if (2 === list.length) return list.join(" " + conjunction + " ");
            if (list.length > 2) {
                var lastItem = list.pop();
                return list.join(", ") + ", " + conjunction + " " + lastItem
            }
            return ""
        };
        exports.authTimeseriesDataFormatter = function(data) {
            return data.map(function(d) {
                var key = d.key,
                    successObj = d.result.buckets.filter(function(ob) {
                        return "SUCCESS" === ob.key
                    })[0];
                successObj = successObj ? {
                    key: "SUCCESS",
                    value: successObj.doc_count
                } : {
                    key: "SUCCESS",
                    value: 0
                };
                var failedAuths = d.result.buckets.filter(function(ob) {
                        return "SUCCESS" !== ob.key
                    }),
                    failedCount = 0;
                return failedAuths.length && (failedCount = failedAuths.reduce(function(count, obj) {
                    return count += obj.doc_count
                }, failedCount)), {
                    key: key,
                    values: [successObj, {
                        key: "FAILURE",
                        value: failedCount
                    }]
                }
            })
        };
        exports.deniedAuthTimeseriesDataFormatter = function(data) {
            return data.map(function(d) {
                return {
                    key: d.key,
                    values: [{
                        key: "FAILURE",
                        value: getDeniedCount(d.result)
                    }]
                }
            })
        };
        exports.getSuccessCount = function(result) {
            var successBucket = result.buckets.filter(function(ob) {
                return "SUCCESS" === ob.key
            })[0];
            return successBucket ? successBucket.doc_count : 0
        };
        var getDeniedCount = function(result) {
            var deniedCount = 0,
                deniedBuckets = result.buckets.filter(function(ob) {
                    return "SUCCESS" !== ob.key
                });
            return deniedBuckets && deniedBuckets.length && (deniedCount = deniedBuckets.reduce(function(count, obj) {
                return count + obj.doc_count
            }, deniedCount)), deniedCount
        };
        exports.getDeniedCount = getDeniedCount;
        exports.createTimeList = function(inc) {
            void 0 === inc && (inc = 60);
            var hour = 11,
                period = "pm",
                times = [];
            if (0 === inc || inc > 60) return times;
            for (var i = 1; i <= 24; i++) 12 === (hour += 1) ? period = "pm" === period ? "am" : "pm" : 13 === hour && (hour = 1), times = times.concat(createMinutesList(hour, period, inc));
            return times
        };
        var createMinutesList = function(hour, period, inc) {
            for (var times = [], minutes = 0; minutes < 60;) times.push(hour + ":" + (minutes < 10 ? "0" + minutes : minutes) + " " + period), minutes += inc;
            return times
        };
        exports.createMinutesList = createMinutesList;
        exports.cleanFilterState = function(state, nonPermittedFilters) {
            return void 0 === nonPermittedFilters && (nonPermittedFilters = []), Object.keys(state).reduce(function(acc, curr) {
                if (!_lodash["default"].contains(nonPermittedFilters, curr)) {
                    var currFilter = state[curr],
                        isValidArray = _lodash["default"].isArray(currFilter);
                    if (isValidArray) {
                        var arrStr = state[curr].join("|");
                        arrStr.length && (acc[curr] = arrStr)
                    } else isValidArray || state[curr] && (acc[curr] = state[curr])
                }
                return acc
            }, {})
        };
        exports.isLocalStorageSupported = function(localStorage) {
            try {
                var storage = localStorage || window.localStorage;
                return storage.setItem(LOCAL_STORAGE_TEST_VALUE, LOCAL_STORAGE_TEST_VALUE), storage.removeItem(LOCAL_STORAGE_TEST_VALUE), !0
            } catch (e) {
                return !1
            }
        };
        var LOCAL_STORAGE_TEST_VALUE = "__duo__";
        exports.LOCAL_STORAGE_TEST_VALUE = LOCAL_STORAGE_TEST_VALUE;
        exports.nestedSet = function nestedSet(object, path, value) {
            var key = path.shift();
            if (path.length) return nestedSet(object[key], path, value);
            object[key] = value
        };
        exports.isValidUsername = function(username) {
            return username.match(/^[^@]+@[^@]+$/)
        }
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        var _lodash = _interopRequireDefault(__webpack_require__(108)),
            _jquery = _interopRequireDefault(__webpack_require__(37)),
            _backbone = _interopRequireDefault(__webpack_require__(111)),
            _gettext = __webpack_require__(109);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        var accessiblyHideMessages = function($messages) {
            $messages.attr("aria-hidden", "true"), $messages.find("button, input, a").each(function(_, input) {
                (0, _jquery["default"])(input).data("old-tabindex", (0, _jquery["default"])(input).attr("tabindex")).attr("tabindex", "-1")
            })
        };
        var messages, styles = {
                error: "error",
                success: "success",
                info: "info",
                warning: "warning"
            },
            messageCounter = 0,
            Message = _backbone["default"].Model.extend({
                initialize: function() {
                    this.set("id", messageCounter), messageCounter += 1
                }
            }),
            MessageView = _backbone["default"].View.extend({
                initialize: function() {
                    this.tabindexOffset = 100 * messageCounter, this.model.on("change", this.update, this), this.model.on("remove", this.destroyMessage, this);
                    var dismissText = (0, _gettext.gettext)("Dismiss"),
                        cancelText = (0, _gettext.gettext)("Cancel");
                    this.dismissTemplate = (0, _jquery["default"])("\n            <button class='btn-dismiss medium-or-larger'\n                 aria-label='" + dismissText + "'\n                 tabindex='" + (this.tabindexOffset + 4) + "'>\n                 <i class='icon-delete'></i>\n            </button>\n            <button class='btn-dismiss medium-or-smaller' tabindex='" + (this.tabindexOffset + 3) + "'>\n                " + dismissText + "\n            </button>"), this.cancelTemplate = (0, _jquery["default"])("\n            <button class='btn-cancel' tabindex='" + (this.tabindexOffset + 2) + "'>\n                " + cancelText + "\n            </button>")
                },
                events: {
                    "click .btn-dismiss": "destroyMessage",
                    "click .btn-cancel": "cancelMessage",
                    "click .btn-link": "didClickButtonLink",
                    "click .btn": "didClickButton"
                },
                _render: function() {
                    var $template = (0, _jquery["default"])("<div class='message'><div class='message-content'><span class='message-text' role='alert'></span></div></div>"),
                        $contentTemplate = $template.find(".message-content");
                    if ($template.attr("data-id", this.model.get("id")), $template.find(".message-text").text(this.model.get("message")), $template.removeClass(_lodash["default"].values(styles).join(" ")).addClass(this.model.get("style")), this.model.get("canDismiss") && ($contentTemplate.append(this.dismissTemplate), (0, _jquery["default"])("html").hasClass("ie7") && $contentTemplate.find(".btn-dismiss.medium-or-larger").text("X")), this.model.get("cancelCallback") && $contentTemplate.append(this.cancelTemplate), this.model.get("help_link")) {
                        var helpLink = this.model.get("help_link"),
                            helpLinkTemplate = '\n                <a href="' + helpLink.href + '" class="btn-link" target="_blank">\n                    ' + helpLink.text + "\n                </a>\n            ";
                        $contentTemplate.append(helpLinkTemplate), (this.model.get("cancelCallback") || this.model.get("canDismiss")) && $template.find(".message-text").addClass("has-link")
                    }
                    if (this.model.get("link")) {
                        var link = this.model.get("link"),
                            linkTemplate = '\n                <a href="' + link.href + '" class="btn-link" tabindex="' + (this.tabindexOffset + 1) + '">\n                    ' + link.text + "\n                </a>\n            ";
                        $contentTemplate.append(linkTemplate), (this.model.get("cancelCallback") || this.model.get("canDismiss")) && $template.find(".message-text").addClass("has-link")
                    }
                    if (this.model.get("button")) {
                        var button = this.model.get("button"),
                            buttonTemplate = '\n                <button id="message" class="btn" tabindex="' + this.tabindexOffset + '">\n                    ' + button.text + "\n                </button>\n            ";
                        $contentTemplate.append(buttonTemplate), (this.model.get("cancelCallback") || this.model.get("canDismiss")) && $template.find(".message-text").addClass("has-link")
                    }
                    return $template
                },
                didClickButtonLink: function(e) {
                    var link = this.model.get("link");
                    link.callback && (e.preventDefault(), link.callback(e))
                },
                didClickButton: function(e) {
                    var button = this.model.get("button");
                    button.callback && (e.preventDefault(), button.callback(e))
                },
                cancelMessage: function(e) {
                    var cb = this.model.get("cancelCallback");
                    cb && cb(e)
                },
                update: function() {
                    var $template = this._render();
                    return this.$el.replaceWith($template), this
                },
                render: function() {
                    var $template = this._render();
                    return this.setElement($template), this
                },
                destroyMessage: function() {
                    var $messages, _this = this;
                    accessiblyHideMessages(this.$el), ($messages = this.$el.prev()).attr("aria-hidden", "false"), $messages.find("button, input, a").each(function(_, input) {
                        var oldTabindex = (0, _jquery["default"])(input).data("old-tabindex");
                        oldTabindex && (0, _jquery["default"])(input).attr("tabindex", oldTabindex)
                    }), this.model && this.model.trigger("destroy", this.model, this.model.collection), this.$el.on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                        _this.remove()
                    }), (0, _jquery["default"])("html").hasClass("lt-ie10") || this.$el.addClass("offscreen"), setTimeout(function() {
                        _this.$el.length && _this.$el.remove()
                    }, 200)
                }
            }),
            Messages = _backbone["default"].Collection.extend({}),
            MessagesView = _backbone["default"].View.extend({
                initialize: function() {
                    this.$messagesList = (0, _jquery["default"])(".messages-list"), this.collection.on("add", this.appendMessage, this), this.collection.on("remove", this.hideView, this)
                },
                _isScrollbarNeeded: function($messageElement) {
                    return !!(0, _jquery["default"])("#pre-flow-prompt-view, #manage-devices").length || (0, _jquery["default"])("body").width() < 480 && $messageElement.height() > 40
                },
                appendMessage: function(message) {
                    var _this2 = this;
                    this.$el.removeClass("hidden");
                    var $viewEl = new MessageView({
                        model: message
                    }).render().$el.addClass("offscreen").appendTo(this.$messagesList);
                    setTimeout(function() {
                        $viewEl.removeClass("offscreen"), accessiblyHideMessages($viewEl.prevAll()), _this2._isScrollbarNeeded($viewEl) && (0, _jquery["default"])(".base-body").addClass("has-message")
                    }, 2)
                },
                hideView: function() {
                    var _this3 = this;
                    setTimeout(function() {
                        0 === _this3.$(".message").length ? (_this3.$el.addClass("hidden"), (0, _jquery["default"])(".base-body").removeClass("has-message")) : _this3.focusLastMessage()
                    }, 500)
                },
                focusLastMessage: function() {
                    var $lastMessage = this.$(".message").last();
                    $lastMessage.length && ($lastMessage.find(".btn-link") ? $lastMessage.find(".btn-link").focus() : $lastMessage.find(".btn-cancel") ? $lastMessage.find(".btn-cancel").focus() : $lastMessage.find(".btn") ? $lastMessage.find(".btn").focus() : $lastMessage.find(".btn-dismiss:visible") && $lastMessage.find(".btn-dismiss:visible").focus())
                }
            });

        function init() {
            messages = new Messages, new MessagesView({
                collection: messages,
                el: "#messages-view"
            })
        }(0, _jquery["default"])(init), module.exports = {
            flashMessage: function(_ref) {
                var messageObj, message = _ref.message,
                    _ref$id = _ref.id,
                    id = void 0 === _ref$id ? null : _ref$id,
                    _ref$style = _ref.style,
                    style = void 0 === _ref$style ? null : _ref$style,
                    _ref$canDismiss = _ref.canDismiss,
                    canDismiss = void 0 === _ref$canDismiss ? null : _ref$canDismiss,
                    _ref$cancelCallback = _ref.cancelCallback,
                    cancelCallback = void 0 === _ref$cancelCallback ? null : _ref$cancelCallback,
                    _ref$link = _ref.link,
                    link = void 0 === _ref$link ? null : _ref$link,
                    _ref$button = _ref.button,
                    button = void 0 === _ref$button ? null : _ref$button,
                    _ref$help_link = _ref.help_link,
                    help_link = void 0 === _ref$help_link ? null : _ref$help_link;
                if (!message) throw "Cannot flash message with no message string.";
                if (id) {
                    if (!(messageObj = messages.find({
                        id: id
                    }))) throw "Could not find message with id " + id;
                    var changedAttributes = {};
                    return style && (changedAttributes.style = style), message && (changedAttributes.message = message), null !== link && (changedAttributes.link = link), null !== help_link && (changedAttributes.help_link = help_link), null !== button && (changedAttributes.button = button), null !== canDismiss && (changedAttributes.canDismiss = canDismiss), null !== cancelCallback && (changedAttributes.cancelCallback = cancelCallback), messageObj.set(changedAttributes), messageObj.get("id")
                }
                if (!style) throw "Cannot flash message with no style.";
                return messageObj = new Message({
                    message: message,
                    style: style,
                    canDismiss: canDismiss,
                    cancelCallback: cancelCallback,
                    link: link,
                    help_link: help_link,
                    button: button
                }), messages.push(messageObj), messageObj.id
            },
            styles: styles,
            init: init,
            clearMessage: function(id) {
                var messageToDelete = messages.filter(function(message) {
                    return message.id == id
                });
                messages.remove(messageToDelete)
            },
            clearAllMessages: function() {
                messages.remove(messages.pluck("id"))
            },
            clearMessagesExcept: function(id) {
                var messagesToDelete = messages.filter(function(message) {
                    return message.id !== id
                });
                messages.remove(messagesToDelete)
            },
            exists: function(id) {
                return id !== undefined && !!messages.filter(function(message) {
                    return message.id == id
                }).length
            },
            resetMessageCounter: function() {
                messageCounter = 0
            }
        }
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = !0, exports.Poller = exports.MAX_WAIT_TIME = exports.JITTER_MAX_FACTOR = exports.JITTER_MIN_FACTOR = exports.DEFAULT_DELAY = exports.RESULT_FAILURE = exports.RESULT_SUCCESS = exports.SUCCESS = exports.STATUS = exports.FAILURE = exports.ERROR = void 0;
        var _events = __webpack_require__(117),
            _gettext = __webpack_require__(109),
            _promiseOrDeferred = __webpack_require__(124);
        exports.ERROR = "err";
        exports.FAILURE = "fail";
        exports.STATUS = "status";
        exports.SUCCESS = "success";
        exports.RESULT_SUCCESS = "SUCCESS";
        exports.RESULT_FAILURE = "FAILURE";
        exports.DEFAULT_DELAY = 500;
        exports.JITTER_MIN_FACTOR = .5;
        exports.JITTER_MAX_FACTOR = 1.5;
        exports.MAX_WAIT_TIME = 18e4;
        var getTime = function() {
                return Date.now ? Date.now() : (new Date).getTime()
            },
            Poller = function() {
                function Poller(http, url, sid, txid) {
                    this.http = http, this.url = url, this.sid = sid, this.txid = txid, this._request = null, this._timeout = null, this._aborted = !1, this._emitter = new _events.EventEmitter, this.on = this._emitter.on, this.emit = this._emitter.emit, this._indeterminateFailCount = 0, this._startTime = null
                }
                var _proto = Poller.prototype;
                return _proto._resetIndeterminateFailCount = function() {
                    this._indeterminateFailCount = 0
                }, _proto.start = function() {
                    var _this = this;
                    this._aborted = !1, this._startTime = getTime(), this._timeout = null;
                    var data = {
                        sid: this.sid,
                        txid: this.txid
                    };
                    this._request = this.http.post(this.url, data), (0, _promiseOrDeferred.handlePromiseOrDeferred)(this._request, function(res) {
                        return _this._resolveRequest(res)
                    }, function(err) {
                        return _this._rejectRequest(err)
                    })
                }, _proto._rejectRequest = function(err) {
                    if (!this._aborted) {
                        if (this.http.isIndeterminateServerError(err)) {
                            if (getTime() - this._startTime > 18e4) return void this.emit("err", {
                                message: (0, _gettext.gettext)("Internal Server Error.")
                            });
                            this._repoll(), this._indeterminateFailCount += 1
                        } else this._resetIndeterminateFailCount();
                        this.emit("err", err)
                    }
                }, _proto._resolveRequest = function(res) {
                    this._aborted || (this._request = null, this._resetIndeterminateFailCount(), "SUCCESS" === res.result ? res.result_url ? this._fetchResult(this.sid, res.result_url) : this.emit("success", res) : "FAILURE" === res.result ? this.emit("fail", res) : res.status ? (this._repoll(), this.emit("status", res)) : this.emit("err", "Unknown error."))
                }, _proto._fetchResult = function(sid, url) {
                    var _this2 = this;
                    this._request = this.http.post(url, {
                        sid: sid
                    }), (0, _promiseOrDeferred.handlePromiseOrDeferred)(this._request, function(res) {
                        _this2._request = null, _this2.emit("success", res)
                    }, function(err) {
                        _this2.emit("err", err)
                    })
                }, _proto._repoll = function() {
                    var _this3 = this,
                        newDelay = 500 * Math.pow(2, this._indeterminateFailCount),
                        delay = Math.min(newDelay, 1e4),
                        jitterFactor = 1;
                    this._indeterminateFailCount && (jitterFactor = -1 * Math.random() + 1.5);
                    var delayWithJitter = delay * jitterFactor;
                    return this._timeout = setTimeout(function() {
                        return _this3.start()
                    }, delayWithJitter), delayWithJitter
                }, _proto.cancel = function() {
                    this._aborted = !0, this._request && this._request.abort && this._request.abort(), this._timeout && clearTimeout(this._timeout), this._startTime = null, this._resetIndeterminateFailCount()
                }, Poller
            }();
        exports.Poller = Poller
    },
    function(module, exports) {
        function EventEmitter() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || undefined
        }

        function isFunction(arg) {
            return "function" == typeof arg
        }

        function isObject(arg) {
            return "object" == typeof arg && null !== arg
        }

        function isUndefined(arg) {
            return void 0 === arg
        }
        module.exports = EventEmitter, EventEmitter.EventEmitter = EventEmitter, EventEmitter.prototype._events = undefined, EventEmitter.prototype._maxListeners = undefined, EventEmitter.defaultMaxListeners = 10, EventEmitter.prototype.setMaxListeners = function(n) {
            if ("number" != typeof n || n < 0 || isNaN(n)) throw TypeError("n must be a positive number");
            return this._maxListeners = n, this
        }, EventEmitter.prototype.emit = function(type) {
            var er, handler, len, args, i, listeners;
            if (this._events || (this._events = {}), "error" === type && (!this._events.error || isObject(this._events.error) && !this._events.error.length)) {
                if ((er = arguments[1]) instanceof Error) throw er;
                var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
                throw err.context = er, err
            }
            if (isUndefined(handler = this._events[type])) return !1;
            if (isFunction(handler)) switch (arguments.length) {
                case 1:
                    handler.call(this);
                    break;
                case 2:
                    handler.call(this, arguments[1]);
                    break;
                case 3:
                    handler.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    args = Array.prototype.slice.call(arguments, 1), handler.apply(this, args)
            } else if (isObject(handler))
                for (args = Array.prototype.slice.call(arguments, 1), len = (listeners = handler.slice()).length, i = 0; i < len; i++) listeners[i].apply(this, args);
            return !0
        }, EventEmitter.prototype.addListener = function(type, listener) {
            var m;
            if (!isFunction(listener)) throw TypeError("listener must be a function");
            return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener), this._events[type] ? isObject(this._events[type]) ? this._events[type].push(listener) : this._events[type] = [this._events[type], listener] : this._events[type] = listener, isObject(this._events[type]) && !this._events[type].warned && (m = isUndefined(this._maxListeners) ? EventEmitter.defaultMaxListeners : this._maxListeners) && m > 0 && this._events[type].length > m && (this._events[type].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[type].length), "function" == typeof console.trace && console.trace()), this
        }, EventEmitter.prototype.on = EventEmitter.prototype.addListener, EventEmitter.prototype.once = function(type, listener) {
            if (!isFunction(listener)) throw TypeError("listener must be a function");
            var fired = !1;

            function g() {
                this.removeListener(type, g), fired || (fired = !0, listener.apply(this, arguments))
            }
            return g.listener = listener, this.on(type, g), this
        }, EventEmitter.prototype.removeListener = function(type, listener) {
            var list, position, length, i;
            if (!isFunction(listener)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[type]) return this;
            if (length = (list = this._events[type]).length, position = -1, list === listener || isFunction(list.listener) && list.listener === listener) delete this._events[type], this._events.removeListener && this.emit("removeListener", type, listener);
            else if (isObject(list)) {
                for (i = length; i-- > 0;)
                    if (list[i] === listener || list[i].listener && list[i].listener === listener) {
                        position = i;
                        break
                    }
                if (position < 0) return this;
                1 === list.length ? (list.length = 0, delete this._events[type]) : list.splice(position, 1), this._events.removeListener && this.emit("removeListener", type, listener)
            }
            return this
        }, EventEmitter.prototype.removeAllListeners = function(type) {
            var key, listeners;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[type] && delete this._events[type], this;
            if (0 === arguments.length) {
                for (key in this._events) "removeListener" !== key && this.removeAllListeners(key);
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if (isFunction(listeners = this._events[type])) this.removeListener(type, listeners);
            else if (listeners)
                for (; listeners.length;) this.removeListener(type, listeners[listeners.length - 1]);
            return delete this._events[type], this
        }, EventEmitter.prototype.listeners = function(type) {
            return this._events && this._events[type] ? isFunction(this._events[type]) ? [this._events[type]] : this._events[type].slice() : []
        }, EventEmitter.prototype.listenerCount = function(type) {
            if (this._events) {
                var evlistener = this._events[type];
                if (isFunction(evlistener)) return 1;
                if (evlistener) return evlistener.length
            }
            return 0
        }, EventEmitter.listenerCount = function(emitter, type) {
            return emitter.listenerCount(type)
        }
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = !0, exports.b64enc = function(buf) {
            return base64js.fromByteArray(buf).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
        }, exports.b64RawEnc = function(buf) {
            return base64js.fromByteArray(buf).replace(/\+/g, "-").replace(/\//g, "_")
        }, exports.hexEncode = function(buf) {
            return Array.from(buf).map(function(x) {
                return ("0" + x.toString(16)).substr(-2)
            }).join("")
        };
        var base64js = function(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj)
                for (var key in obj)
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                        desc.get || desc.set ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key]
                    }
            return newObj["default"] = obj, newObj
        }(__webpack_require__(122))
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        var stringifyPrimitive = function(v) {
            switch (typeof v) {
                case "string":
                    return v;
                case "boolean":
                    return v ? "true" : "false";
                case "number":
                    return isFinite(v) ? v : "";
                default:
                    return ""
            }
        };
        module.exports = function(obj, sep, eq, name) {
            return sep = sep || "&", eq = eq || "=", null === obj && (obj = undefined), "object" == typeof obj ? map(objectKeys(obj), function(k) {
                var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
                return isArray(obj[k]) ? map(obj[k], function(v) {
                    return ks + encodeURIComponent(stringifyPrimitive(v))
                }).join(sep) : ks + encodeURIComponent(stringifyPrimitive(obj[k]))
            }).join(sep) : name ? encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj)) : ""
        };
        var isArray = Array.isArray || function(xs) {
            return "[object Array]" === Object.prototype.toString.call(xs)
        };

        function map(xs, f) {
            if (xs.map) return xs.map(f);
            for (var res = [], i = 0; i < xs.length; i++) res.push(f(xs[i], i));
            return res
        }
        var objectKeys = Object.keys || function(obj) {
            var res = [];
            for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && res.push(key);
            return res
        }
    },
    function(module, exports, __webpack_require__) {
        "use strict";

        function hasOwnProperty(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop)
        }
        module.exports = function(qs, sep, eq, options) {
            sep = sep || "&", eq = eq || "=";
            var obj = {};
            if ("string" != typeof qs || 0 === qs.length) return obj;
            var regexp = /\+/g;
            qs = qs.split(sep);
            var maxKeys = 1e3;
            options && "number" == typeof options.maxKeys && (maxKeys = options.maxKeys);
            var len = qs.length;
            maxKeys > 0 && len > maxKeys && (len = maxKeys);
            for (var i = 0; i < len; ++i) {
                var kstr, vstr, k, v, x = qs[i].replace(regexp, "%20"),
                    idx = x.indexOf(eq);
                idx >= 0 ? (kstr = x.substr(0, idx), vstr = x.substr(idx + 1)) : (kstr = x, vstr = ""), k = decodeURIComponent(kstr), v = decodeURIComponent(vstr), hasOwnProperty(obj, k) ? isArray(obj[k]) ? obj[k].push(v) : obj[k] = [obj[k], v] : obj[k] = v
            }
            return obj
        };
        var isArray = Array.isArray || function(xs) {
            return "[object Array]" === Object.prototype.toString.call(xs)
        }
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        exports.decode = exports.parse = __webpack_require__(120), exports.encode = exports.stringify = __webpack_require__(119)
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        var lookup = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        ! function(exports) {
            var Arr = "undefined" != typeof Uint8Array ? Uint8Array : Array,
                PLUS = "+".charCodeAt(0),
                SLASH = "/".charCodeAt(0),
                NUMBER = "0".charCodeAt(0),
                LOWER = "a".charCodeAt(0),
                UPPER = "A".charCodeAt(0),
                PLUS_URL_SAFE = "-".charCodeAt(0),
                SLASH_URL_SAFE = "_".charCodeAt(0);

            function decode(elt) {
                var code = elt.charCodeAt(0);
                return code === PLUS || code === PLUS_URL_SAFE ? 62 : code === SLASH || code === SLASH_URL_SAFE ? 63 : code < NUMBER ? -1 : code < NUMBER + 10 ? code - NUMBER + 26 + 26 : code < UPPER + 26 ? code - UPPER : code < LOWER + 26 ? code - LOWER + 26 : void 0
            }
            exports.toByteArray = function(b64) {
                var i, j, l, tmp, placeHolders, arr;
                if (b64.length % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                var len = b64.length;
                placeHolders = "=" === b64.charAt(len - 2) ? 2 : "=" === b64.charAt(len - 1) ? 1 : 0, arr = new Arr(3 * b64.length / 4 - placeHolders), l = placeHolders > 0 ? b64.length - 4 : b64.length;
                var L = 0;

                function push(v) {
                    arr[L++] = v
                }
                for (i = 0, j = 0; i < l; i += 4, j += 3) push((16711680 & (tmp = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3)))) >> 16), push((65280 & tmp) >> 8), push(255 & tmp);
                return 2 === placeHolders ? push(255 & (tmp = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4)) : 1 === placeHolders && (push((tmp = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2) >> 8 & 255), push(255 & tmp)), arr
            }, exports.fromByteArray = function(uint8) {
                var i, temp, length, num, extraBytes = uint8.length % 3,
                    output = "";

                function encode(num) {
                    return lookup.charAt(num)
                }
                for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2], output += encode((num = temp) >> 18 & 63) + encode(num >> 12 & 63) + encode(num >> 6 & 63) + encode(63 & num);
                switch (extraBytes) {
                    case 1:
                        output += encode((temp = uint8[uint8.length - 1]) >> 2), output += encode(temp << 4 & 63), output += "==";
                        break;
                    case 2:
                        output += encode((temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1]) >> 10), output += encode(temp >> 4 & 63), output += encode(temp << 2 & 63), output += "="
                }
                return output
            }
        }(exports)
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = !0, exports["default"] = exports.WebAuthnError = exports.WEBAUTHN_AUTH_FAILED = exports.WEBAUTHN_AUTH_SUCCESS = exports.WEBAUTHN_FACTOR_FINISH = exports.WEBAUTHN_FACTOR_START = exports.WEBAUTHN_DEVICE = exports.POLLER_STATUS_CODE_WEBAUTHN_SENT = void 0;
        var obj, _jquery = __webpack_require__(37),
            http = _interopRequireWildcard(__webpack_require__(112)),
            poll = _interopRequireWildcard(__webpack_require__(116)),
            _lodash = (obj = __webpack_require__(108)) && obj.__esModule ? obj : {
                "default": obj
            },
            _b = __webpack_require__(118);
        __webpack_require__(109);

        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj)
                for (var key in obj)
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                        desc.get || desc.set ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key]
                    }
            return newObj["default"] = obj, newObj
        }
        exports.POLLER_STATUS_CODE_WEBAUTHN_SENT = "webauthn_sent";
        exports.WEBAUTHN_DEVICE = "webauthn_credential";
        exports.WEBAUTHN_FACTOR_START = "WebAuthn Credential";
        exports.WEBAUTHN_FACTOR_FINISH = "webauthn_finish";
        exports.WEBAUTHN_AUTH_SUCCESS = "WEBAUTHN_AUTH_SUCCESS";
        exports.WEBAUTHN_AUTH_FAILED = "WEBAUTHN_AUTH_FAILED";
        var WebAuthnError = function(message, name, stack, lineNumber) {
            void 0 === stack && (stack = null), void 0 === lineNumber && (lineNumber = null), this.name = "(WebAuthnError) " + name, this.message = this.name + ": " + message, stack && (this.stack = stack), lineNumber && (this.lineNumber = lineNumber)
        };
        exports.WebAuthnError = WebAuthnError, WebAuthnError.prototype = Error.prototype;
        var WebauthnActions = {
                _updateEncodingForItemId: function(item) {
                    var updated = item.id.replace(/_/g, "/").replace(/-/g, "+");
                    return item.id = Uint8Array.from(atob(updated), function(c) {
                        return c.charCodeAt(0)
                    }), item
                },
                _transformPubKeyCreateOptions: function(pubKeyCreateOptions) {
                    var challenge = Uint8Array.from(atob(pubKeyCreateOptions.challenge), function(c) {
                            return c.charCodeAt(0)
                        }),
                        id = Uint8Array.from(atob(pubKeyCreateOptions.user.id), function(c) {
                            return c.charCodeAt(0)
                        });
                    pubKeyCreateOptions.excludeCredentials.map(this._updateEncodingForItemId);
                    var transformedOptions = _lodash["default"].cloneDeep(pubKeyCreateOptions);
                    return transformedOptions.user.id = id, transformedOptions.challenge = challenge, transformedOptions
                },
                create: function(enrollResponse) {
                    var deferred = new _jquery.Deferred,
                        transformedPubKeyOptions = WebauthnActions._transformPubKeyCreateOptions(enrollResponse.enroll_data);
                    return navigator.credentials.create({
                        publicKey: transformedPubKeyOptions
                    }).then(function(newCredentialInfo) {
                        deferred.resolve(newCredentialInfo)
                    })["catch"](function(err) {
                        deferred.reject(err)
                    }), deferred.promise()
                },
                startAuth: function(txidUrl, pollUrl, sid, device) {
                    var dfd = new _jquery.Deferred,
                        data = {
                            sid: sid,
                            device: device,
                            factor: "WebAuthn Credential"
                        };
                    return http.post(txidUrl, data).fail(function(err) {
                        return dfd.reject(err)
                    }).then(function(res) {
                        var poller = new poll.Poller(http, pollUrl, sid, res.txid);
                        WebauthnActions.pollDuoForWebauthnChallenge(dfd, poller)
                    }), dfd.promise()
                },
                pollDuoForWebauthnChallenge: function(deferred, poller) {
                    poller.on(poll.STATUS, function(res) {
                        "webauthn_sent" === res.status_code && (deferred.resolve(res.status, res.webauthn_credential_request_options), poller.cancel())
                    }), poller.on(poll.SUCCESS, function(res) {
                        return deferred.reject(res)
                    }), poller.on(poll.FAILURE, function(res) {
                        return deferred.reject(res)
                    }), poller.on(poll.ERROR, function(res) {
                        return deferred.reject(res)
                    }), poller.start()
                },
                _transformPublicKeyCredentials: function(publicKeyCredentialOptions) {
                    var options = _lodash["default"].cloneDeep(publicKeyCredentialOptions),
                        challenge = Uint8Array.from(atob(options.challenge), function(c) {
                            return c.charCodeAt(0)
                        }),
                        allowCredentials = options.allowCredentials.map(this._updateEncodingForItemId);
                    return _lodash["default"].assign({}, options, {
                        challenge: challenge,
                        allowCredentials: allowCredentials
                    })
                },
                get: function(publicKeyCredentialsOptionsFromServer) {
                    var dfd = new _jquery.Deferred,
                        publicKeyCredentialsOptions = WebauthnActions._transformPublicKeyCredentials(publicKeyCredentialsOptionsFromServer);
                    return navigator.credentials.get({
                        publicKey: publicKeyCredentialsOptions
                    }).then(function(assertionInfo) {
                        dfd.resolve(assertionInfo)
                    })["catch"](function(err) {
                        dfd.reject(err)
                    }), dfd.promise()
                },
                _transformAssertionData: function(sid, assertionData, options) {
                    void 0 === options && (options = {});
                    var authenticatorData = new Uint8Array(assertionData.response.authenticatorData),
                        clientDataJSON = new Uint8Array(assertionData.response.clientDataJSON),
                        rawId = new Uint8Array(assertionData.rawId),
                        signature = new Uint8Array(assertionData.response.signature),
                        wData = {
                            sessionId: assertionData.sessionId,
                            id: assertionData.id,
                            rawId: (0, _b.b64enc)(rawId),
                            type: assertionData.type,
                            authenticatorData: (0, _b.b64RawEnc)(authenticatorData),
                            clientDataJSON: (0, _b.b64RawEnc)(clientDataJSON),
                            signature: (0, _b.hexEncode)(signature)
                        };
                    return (0, _jquery.extend)({
                        sid: sid,
                        device: "webauthn_credential",
                        factor: "webauthn_finish",
                        response_data: JSON.stringify(wData)
                    }, options)
                },
                pollDuoForWebauthnValidation: function(deferred, poller, txid) {
                    poller.on(poll.SUCCESS, function(res) {
                        return deferred.resolve(txid, res)
                    }), poller.on(poll.FAILURE, function(res) {
                        return deferred.reject(res)
                    }), poller.on(poll.ERROR, function(res) {
                        return deferred.reject(res)
                    }), poller.on(poll.STATUS, function(res) {
                        deferred.reject(res), poller.cancel()
                    }), poller.start()
                },
                validate: function(validationUrl, pollUrl, sid, webAuthnData, options) {
                    void 0 === options && (options = {});
                    var dfd = new _jquery.Deferred,
                        dataToPost = WebauthnActions._transformAssertionData(sid, webAuthnData, options);
                    return http.post(validationUrl, dataToPost).fail(function(err) {
                        return dfd.reject(err)
                    }).then(function(res) {
                        var txid = res.txid,
                            poller = new poll.Poller(http, pollUrl, sid, txid);
                        WebauthnActions.pollDuoForWebauthnValidation(dfd, poller, txid)
                    }), dfd.promise()
                }
            },
            _default = WebauthnActions;
        exports["default"] = _default
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = !0, exports.handlePromiseOrDeferred = void 0;
        exports.handlePromiseOrDeferred = function(promise, resolve, reject) {
            promise.fail ? (promise.fail(reject), promise.then(resolve)) : promise.then(resolve)["catch"](reject)
        }
    }, , , ,
    function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = !0, exports.CookieTester = exports.DELETE_COOKIE_TEST_BODY = exports.SAMESITE_ATTRIBUTE = exports.BASE_COOKIE_TEST_BODY = void 0;
        var obj, _jquery = (obj = __webpack_require__(37)) && obj.__esModule ? obj : {
            "default": obj
        };
        var SAFARI_RE = /Version\/([0-9\.]+)[a-zA-Z0-9\. /]+Safari\/([0-9\.]+)$/,
            FIREFOX_RE = /Firefox\/([0-9\.]+)$/,
            ANDROID_WEBVIEW_RE = /Chrome\/([0-9\.]+) Mobile Safari\/([0-9\.]+)$/;
        exports.BASE_COOKIE_TEST_BODY = "cookietest=1; ";
        exports.SAMESITE_ATTRIBUTE = "SameSite=None; secure;";
        exports.DELETE_COOKIE_TEST_BODY = "cookietest=1;  expires=Thu, 01-Jan-1970 00:00:01 GMT";
        var CookieTester = function() {
            function CookieTester() {
                this.userAgent = navigator.userAgent
            }
            var _proto = CookieTester.prototype;
            return _proto.isThirdPolicyBrowser = function() {
                var result = FIREFOX_RE.exec(this.userAgent);
                return !!(result && result[1] >= 22) || !ANDROID_WEBVIEW_RE.test(this.userAgent) && !!SAFARI_RE.test(this.userAgent)
            }, _proto.isCookieSet = function() {
                return -1 !== document.cookie.indexOf("cookietest=")
            }, _proto.createCookie = function() {
                var testCookie = "cookietest=1; ";
                return SAFARI_RE.test(this.userAgent) || (testCookie += "SameSite=None; secure;"), testCookie
            }, _proto.isCookieDisabled = function() {
                document.cookie = this.createCookie();
                var ret = this.isCookieSet();
                return document.cookie = "cookietest=1;  expires=Thu, 01-Jan-1970 00:00:01 GMT", !ret
            }, _proto.openWindow = function(url, windowName, options) {
                return window.open(url, windowName, options)
            }, _proto.startTest = function() {
                return this.deferred ? this.deferred.promise() : (this.deferred = _jquery["default"].Deferred(), this.isCookieDisabled() ? this.isThirdPolicyBrowser() ? this.openWindow("/frame/dummy", "dummy_cookie", "left=100,top=100,location=no,width=1,height=1,toolbar=no") : this.deferred.reject() : this.deferred.resolve(), this.deferred.promise())
            }, _proto.deferredResolver = function() {
                this.isCookieDisabled() ? this.deferred.reject() : this.deferred.resolve()
            }, _proto.testIsDone = function() {
                var _this = this;
                setTimeout(function() {
                    return _this.deferredResolver()
                }, 50)
            }, CookieTester
        }();
        exports.CookieTester = CookieTester
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = !0, exports["default"] = void 0;
        var u2f = u2f || {};
        u2f.EXTENSION_ID = "kmendfapggjehodndflmmgagdbamhnfd", u2f.MessageTypes = {
            U2F_REGISTER_REQUEST: "u2f_register_request",
            U2F_SIGN_REQUEST: "u2f_sign_request",
            U2F_REGISTER_RESPONSE: "u2f_register_response",
            U2F_SIGN_RESPONSE: "u2f_sign_response"
        }, u2f.ErrorCodes = {
            OK: 0,
            OTHER_ERROR: 1,
            BAD_REQUEST: 2,
            CONFIGURATION_UNSUPPORTED: 3,
            DEVICE_INELIGIBLE: 4,
            TIMEOUT: 5
        }, u2f.Request, u2f.Response, u2f.Error, u2f.SignRequest, u2f.SignResponse, u2f.RegisterRequest, u2f.RegisterResponse, u2f.getMessagePort = function(callback) {
            if ("undefined" != typeof chrome && chrome.runtime) {
                var msg = {
                    type: u2f.MessageTypes.U2F_SIGN_REQUEST,
                    signRequests: []
                };
                chrome.runtime.sendMessage(u2f.EXTENSION_ID, msg, function() {
                    chrome.runtime.lastError ? u2f.getIframePort_(callback) : u2f.getChromeRuntimePort_(callback)
                })
            } else u2f.getIframePort_(callback)
        }, u2f.getChromeRuntimePort_ = function(callback) {
            var port = chrome.runtime.connect(u2f.EXTENSION_ID, {
                includeTlsChannelId: !0
            });
            setTimeout(function() {
                callback(new u2f.WrappedChromeRuntimePort_(port))
            }, 0)
        }, u2f.WrappedChromeRuntimePort_ = function(port) {
            this.port_ = port
        }, u2f.WrappedChromeRuntimePort_.prototype.postMessage = function(message) {
            this.port_.postMessage(message)
        }, u2f.WrappedChromeRuntimePort_.prototype.addEventListener = function(eventName, handler) {
            var name = eventName.toLowerCase();
            "message" == name || "onmessage" == name ? this.port_.onMessage.addListener(function(message) {
                handler({
                    data: message
                })
            }) : console.error("WrappedChromeRuntimePort only supports onMessage")
        }, u2f.getIframePort_ = function(callback) {
            var iframeOrigin = "chrome-extension://" + u2f.EXTENSION_ID,
                iframe = document.createElement("iframe");
            iframe.src = iframeOrigin + "/u2f-comms.html", iframe.setAttribute("style", "display:none"), document.body.appendChild(iframe);
            var channel = new MessageChannel;
            channel.port1.addEventListener("message", function ready(message) {
                "ready" == message.data ? (channel.port1.removeEventListener("message", ready), callback(channel.port1)) : console.error('First event on iframe port was not "ready"')
            }), channel.port1.start(), iframe.addEventListener("load", function() {
                iframe.contentWindow.postMessage("init", iframeOrigin, [channel.port2])
            })
        }, u2f.EXTENSION_TIMEOUT_SEC = 30, u2f.port_ = null, u2f.waitingForPort_ = [], u2f.reqCounter_ = 0, u2f.callbackMap_ = {}, u2f.getPortSingleton_ = function(callback) {
            u2f.port_ ? callback(u2f.port_) : (0 == u2f.waitingForPort_.length && u2f.getMessagePort(function(port) {
                for (u2f.port_ = port, u2f.port_.addEventListener("message", u2f.responseHandler_); u2f.waitingForPort_.length;) u2f.waitingForPort_.shift()(u2f.port_)
            }), u2f.waitingForPort_.push(callback))
        }, u2f.responseHandler_ = function(message) {
            var response = message.data,
                reqId = response.requestId;
            if (reqId && u2f.callbackMap_[reqId]) {
                var cb = u2f.callbackMap_[reqId];
                delete u2f.callbackMap_[reqId], cb(response.responseData)
            } else console.error("Unknown or missing requestId in response.")
        }, u2f.sign = function(signRequests, callback, opt_timeoutSeconds) {
            u2f.getPortSingleton_(function(port) {
                var reqId = ++u2f.reqCounter_;
                u2f.callbackMap_[reqId] = callback;
                var req = {
                    type: u2f.MessageTypes.U2F_SIGN_REQUEST,
                    signRequests: signRequests,
                    timeoutSeconds: void 0 !== opt_timeoutSeconds ? opt_timeoutSeconds : u2f.EXTENSION_TIMEOUT_SEC,
                    requestId: reqId
                };
                port.postMessage(req)
            })
        }, u2f.register = function(registerRequests, signRequests, callback, opt_timeoutSeconds) {
            u2f.getPortSingleton_(function(port) {
                var reqId = ++u2f.reqCounter_;
                u2f.callbackMap_[reqId] = callback;
                var req = {
                    type: u2f.MessageTypes.U2F_REGISTER_REQUEST,
                    signRequests: signRequests,
                    registerRequests: registerRequests,
                    timeoutSeconds: void 0 !== opt_timeoutSeconds ? opt_timeoutSeconds : u2f.EXTENSION_TIMEOUT_SEC,
                    requestId: reqId
                };
                port.postMessage(req)
            })
        };
        var _default = u2f;
        exports["default"] = _default
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = !0, exports.start = function(url, pollUrl, sid, postAuthAction) {
            void 0 === postAuthAction && (postAuthAction = null);
            var dfd = new _jquery.Deferred,
                paramsForU2FRequestData = {
                    device: DEVICE,
                    factor: FACTOR_START,
                    post_auth_action: postAuthAction,
                    sid: sid
                };
            return http.post(url, paramsForU2FRequestData).fail(function(err) {
                return dfd.reject(err)
            }).then(function(res) {
                var poller = new poll.Poller(http, pollUrl, sid, res.txid);
                poller.on(poll.STATUS, function(res) {
                    res.status_code === POLLER_STATUS_CODE_U2F_SENT && (dfd.resolve(res.status, res.u2f_sign_request), poller.cancel())
                }), poller.on(poll.SUCCESS, function(res) {
                    return dfd.reject(res)
                }), poller.on(poll.FAILURE, function(res) {
                    return dfd.reject(res)
                }), poller.on(poll.ERROR, function(res) {
                    return dfd.reject(res)
                }), poller.start()
            }), dfd.promise()
        }, exports.sign = function(data, retryOnTimeout) {
            var dfd = new _jquery.Deferred,
                sessionIds = {};
            return (0, _lodash.forEach)(data, function(d) {
                    return sessionIds[d.keyHandle] = d.sessionId
                }),
                function sign() {
                    _u2f["default"].sign(data, function(res) {
                        res.errorCode ? res.errorCode === _u2f["default"].ErrorCodes.TIMEOUT ? !1 === retryOnTimeout ? dfd.reject(new U2FError(res.errorCode)) : sign() : dfd.reject(new U2FError(res.errorCode)) : dfd.resolve({
                            sessionId: sessionIds[res.keyHandle],
                            keyHandle: res.keyHandle,
                            clientData: res.clientData,
                            signatureData: res.signatureData
                        })
                    }, TIMEOUT_SECONDS)
                }(), dfd.promise()
        }, exports.validate = function(url, pollUrl, sid, u2fData, options) {
            void 0 === options && (options = {});
            var dfd = new _jquery.Deferred,
                data = (0, _jquery.extend)({
                    sid: sid,
                    device: DEVICE,
                    factor: FACTOR_FINISH,
                    response_data: JSON.stringify(u2fData)
                }, options);
            return http.post(url, data).fail(function(err) {
                return dfd.reject(err)
            }).then(function(res) {
                var txid = res.txid,
                    poller = new poll.Poller(http, pollUrl, sid, txid);
                poller.on(poll.SUCCESS, function(res) {
                    return dfd.resolve(txid, res)
                }), poller.on(poll.FAILURE, function(res) {
                    return dfd.reject(res)
                }), poller.on(poll.ERROR, function(res) {
                    return dfd.reject(res)
                }), poller.on(poll.STATUS, function(res) {
                    dfd.reject(res), poller.cancel()
                }), poller.start()
            }), dfd.promise()
        }, exports._u2fApi = exports.U2FError = exports.DEVICE = exports.POLLER_STATUS_CODE_U2F_SENT = void 0;
        var obj, _jquery = __webpack_require__(37),
            _lodash = __webpack_require__(108),
            _u2f = (obj = __webpack_require__(129)) && obj.__esModule ? obj : {
                "default": obj
            },
            http = _interopRequireWildcard(__webpack_require__(112)),
            poll = _interopRequireWildcard(__webpack_require__(116)),
            _gettext = __webpack_require__(109);

        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj)
                for (var key in obj)
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                        desc.get || desc.set ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key]
                    }
            return newObj["default"] = obj, newObj
        }
        var TIMEOUT_SECONDS = 60,
            POLLER_STATUS_CODE_U2F_SENT = "u2f_sent";
        exports.POLLER_STATUS_CODE_U2F_SENT = POLLER_STATUS_CODE_U2F_SENT;
        var DEVICE = "u2f_token";
        exports.DEVICE = DEVICE;
        var FACTOR_START = "U2F Token",
            FACTOR_FINISH = "u2f_finish",
            U2FError = function(errorCode) {
                errorCode === _u2f["default"].ErrorCodes.OTHER_ERROR ? this.message = (0, _gettext.gettext)("Unexpected error. Please try again.") : errorCode === _u2f["default"].ErrorCodes.BAD_REQUEST ? this.message = (0, _gettext.gettext)("Bad request.") : errorCode === _u2f["default"].ErrorCodes.CONFIGURATION_UNSUPPORTED ? this.message = (0, _gettext.gettext)("Configuration unsupported.") : errorCode === _u2f["default"].ErrorCodes.DEVICE_INELIGIBLE ? this.message = (0, _gettext.gettext)("Security Key is not registered.") : errorCode === _u2f["default"].ErrorCodes.TIMEOUT && (this.message = (0, _gettext.gettext)("Security Key either timed out or was cancelled.")), this.errorCode = errorCode
            };
        exports.U2FError = U2FError, U2FError.prototype = Error.prototype;
        var _u2fApi = _u2f["default"];
        exports._u2fApi = _u2fApi
    },
    function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = !0, exports["default"] = void 0;
        var _jquery = _interopRequireDefault(__webpack_require__(37)),
            _lodash = _interopRequireDefault(__webpack_require__(108)),
            _backbone = (__webpack_require__(117), __webpack_require__(111)),
            _querystringEs = _interopRequireDefault(__webpack_require__(121)),
            http = _interopRequireWildcard(__webpack_require__(112)),
            poll = _interopRequireWildcard(__webpack_require__(116)),
            u2f = _interopRequireWildcard(__webpack_require__(130)),
            _util = __webpack_require__(114),
            _webauthn = _interopRequireWildcard(__webpack_require__(123)),
            _gettext = __webpack_require__(109),
            messages = _interopRequireWildcard(__webpack_require__(115)),
            _cookieTester = __webpack_require__(128);

        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj)
                for (var key in obj)
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                        desc.get || desc.set ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key]
                    }
            return newObj["default"] = obj, newObj
        }

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        var AUTH_INCORRECT_PASSCODE_MSG = (0, _gettext.gettext)("Incorrect passcode. Please try again."),
            _default = _backbone.View.extend({
                initialize: function() {
                    var _this = this;
                    try {
                        this.delegateEvents(), this.currentAuthRequest = null, this.currentAuthPoller = null, this.currentU2FAuthRequest = null, this.currentU2FPoller = null, this.manageDevicesAfterU2F = !("manageDevices" !== this.postAuthAction || !this.hasSupportedU2FToken()), this.currentWebAuthnAuthRequest = null, this.currentWebAuthnPoller = null, this.sessionId = null, this.manageDevicesAfterWebAuthn = !("manageDevices" !== this.postAuthAction || !this.hasSupportedWebAuthnCredential()), this.canDampen = !0, this.authPopup = null, this.sid = this.$el.find('[name="sid"]').val(), this.url = this.$el.find('[name="url"]').val(), this.ukey = this.$el.find('[name="ukey"]').val(), this.statusItemTemplate = this.$el.find("#status-template").remove().removeAttr("id"), this.cancelLink = this.statusItemTemplate.find(".cancel-link").detach(), this.loadDampenChoice(this.ukey), this.selectedPasscode = null, this.selectedFactor = null, this.selectedDevice = this.$el.find('[name="device"]').val(), this.showDevice(this.selectedDevice), this.readOnly = "True" === this.$el.find('[name="readonly"]').val(), this.readOnly && this.$el.find("#manage-devices-button").length && this.flashMessage({
                            message: (0, _gettext.gettext)("Under maintenance. Device management is temporarily disabled."),
                            style: messages.styles.info
                        }), this.focusOnModalButtonIfPresent(), "device-management-portal" !== this.$el.find('[name="itype"]').val() && this.checkDevicePreferences(), this.enrollmentMessage = this.$el.find('[name="enrollment_message"]').val(), this.outOfDate = "True" === this.$el.find('[name="out_of_date"]').val(), this.hasSupportedU2FToken() ? this.startU2FAuthRequest().always(function() {
                            _this.flashOutOfDate(), _this.flashEnrollmentMessage()
                        }) : (this.flashOutOfDate(), this.flashEnrollmentMessage()), this.shouldRetryU2FTimeouts = "True" === this.$el.find('[name="should_retry_u2f_timeouts"]').val()
                    } catch (err) {
                        throw err
                    } finally {
                        this.$el.find(".login-form").removeClass("hidden"), this.showPasscodeFieldIfOnlyVisibleFactor()
                    }
                },
                events: {
                    "click form :submit": "didClickLoginButton",
                    'change [name="device"]': "didChangeDevice",
                    'click [name="dampen_choice"]': "didClickDampenChoice",
                    "click .passcode-label": "didClickPasscodeLabel",
                    'focus .passcode-label button[type="submit"]': "didFocusPasscodeButton",
                    'focus [name="passcode"]': "didFocusPasscode",
                    "click .cancel-link": "didClickCancelLink",
                    "click .help-nav": "didClickHelpNav"
                },
                submit: function(e) {
                    var device = this.selectedDevice,
                        factor = this.selectedFactor,
                        passcode = this.selectedPasscode,
                        message = this.authStatusMessage;
                    e && (e.preventDefault(), e.stopPropagation()), factor !== _webauthn.WEBAUTHN_FACTOR_START ? device !== u2f.DEVICE || passcode ? !0 !== this.$el.find('[type="submit"]').prop("disabled") && this.startAuthRequest(device, factor, passcode, e) : this.currentU2FAuthRequest || this.currentU2FPoller ? (this.manageDevicesAfterU2F = !1, this.flashMessage({
                        message: (0, _gettext.gettext)("Use your Security Key to log in..."),
                        style: messages.styles.info
                    })) : this.startU2FAuthRequest() : this.currentWebAuthnAuthRequest || this.currentWebAuthnPoller ? (this.manageDevicesAfterWebAuthn = !1, this.flashMessage({
                        message: (0, _gettext.gettext)(message),
                        style: messages.styles.info
                    })) : this.startWebAuthnAuthRequest()
                },
                didPressEnter: function(e) {
                    if (13 === e.which) {
                        e.preventDefault();
                        var $activeElement = (0, _jquery["default"])(document.activeElement);
                        if ("submit" == $activeElement.attr("type")) return $activeElement.click(), !1;
                        var $activeMethod = this.$("fieldset").filter("[data-device-index]").filter(':not(".hidden")'),
                            $push = $activeMethod.find(".push-label"),
                            $phone = $activeMethod.find(".phone-label"),
                            $passcode = $activeMethod.find(".passcode-label"),
                            $webauthn = $activeMethod.find(".webauthn-label");
                        $passcode.length && !$passcode.find('[name="passcode"]').hasClass("hidden") ? $passcode.find('[type="submit"]').click() : $webauthn.length ? $webauthn.find('[type="submit"]').click() : $push.length ? $push.find('[type="submit"]').click() : $phone.length && $phone.find('[type="submit"]').click()
                    }
                },
                showPasscodeFieldIfOnlyVisibleFactor: function() {
                    this.visibleDeviceOnlyHasPasscodeFactor() && !this.isModalPresent() && this.getVisibleFieldset().find(".passcode-label").find(':button[type="submit"]').trigger("focus")
                },
                isModalPresent: function() {
                    return 1 === this.$el.find(".modal-overlay").length
                },
                focusOnModalButtonIfPresent: function() {
                    var $modalButton = this.$el.find(".modal-overlay button");
                    $modalButton.length && $modalButton.focus()
                },
                getPasscodeMessage: function(smsable, mobileOtpable, hasToken, nextPasscode) {
                    var msg = (0, _gettext.gettext)("Enter a passcode or contact your administrator for a bypass code.");
                    return smsable && mobileOtpable && hasToken ? msg = nextPasscode ? (0, _gettext.format)((0, _gettext.gettext)("Enter a passcode from %s, a text, or a hardware token. Your next SMS passcode starts with %s."), "Duo Mobile", nextPasscode) : (0, _gettext.format)((0, _gettext.gettext)("Enter a passcode from %s, a text, or a hardware token."), "Duo Mobile") : smsable && mobileOtpable ? msg = nextPasscode ? (0, _gettext.format)((0, _gettext.gettext)("Enter a passcode from %s or a text. Your next SMS passcode starts with %s."), "Duo Mobile", nextPasscode) : (0, _gettext.format)((0, _gettext.gettext)("Enter a passcode from %s or a text."), "Duo Mobile") : smsable && hasToken ? msg = nextPasscode ? (0, _gettext.format)((0, _gettext.gettext)("Enter a passcode from a text or a hardware token. Your next SMS passcode starts with %s."), nextPasscode) : (0, _gettext.gettext)("Enter a passcode from a text or a hardware token.") : mobileOtpable && hasToken ? msg = (0, _gettext.format)((0, _gettext.gettext)("Enter a passcode from %s or a hardware token."), "Duo Mobile") : mobileOtpable ? msg = (0, _gettext.format)((0, _gettext.gettext)("Enter a passcode from %s."), "Duo Mobile") : smsable ? msg = nextPasscode ? (0, _gettext.format)((0, _gettext.gettext)("Enter a passcode from a text. Your next SMS passcode starts with %s."), nextPasscode) : (0, _gettext.gettext)("Enter a passcode from a text.") : hasToken && (msg = (0, _gettext.gettext)("Enter a passcode from a hardware token.")), msg
                },
                flashPasscodeMessage: function(smsable, mobileOtpable, hasToken, nextPasscode) {
                    var _this2 = this;
                    if (!messages.exists(this.smsMessage)) {
                        var messageOpts = {
                            message: this.getPasscodeMessage(smsable, mobileOtpable, hasToken, nextPasscode),
                            canDismiss: !0,
                            style: messages.styles.info
                        };
                        smsable && (messageOpts.button = {
                            text: (0, _gettext.gettext)("Text me new codes"),
                            callback: function() {
                                _this2.sendSMSCodes()
                            }
                        }), this.smsMessage = this.flashMessage(messageOpts)
                    }
                },
                didClickLoginButton: function(e) {
                    var $target = (0, _jquery["default"])(e.target),
                        $parentLabel = $target.closest(".row-label");
                    if (this.selectedDevice = this.$el.find('[name="device"]').val(), this.authStatusMessage = this.$el.find('[data-device-index="' + this.selectedDevice + '"]').find('[name="auth_status_msg"]').val(), this.selectedFactor = $target.siblings('[name="factor"]').val(), "Passcode" === this.selectedFactor)
                        if (this.selectedPasscode = $target.siblings('[name="passcode"]').val(), this.selectedPasscode) this.submit(e);
                        else {
                            e.preventDefault(), e.stopPropagation();
                            var smsable = "True" === $target.siblings('[name="phone-smsable"]').val(),
                                mobileOtpable = "True" === $target.siblings('[name="mobile-otpable"]').val(),
                                hasToken = "true" === this.$el.find('[name="has-token"]').val(),
                                nextPasscode = this.getNextPasscode($parentLabel);
                            this.flashPasscodeMessage(smsable, mobileOtpable, hasToken, nextPasscode), $target.text((0, _gettext.gettext)("Log In")), $target.parent().find("span").addClass("hidden");
                            var $passcodeInput = $parentLabel.find('[name="passcode"]');
                            $passcodeInput.removeClass("hidden").focus(), this.countVisibleAuthFactors() > 1 && this.scrollToPasscodeInput($passcodeInput), (0, _jquery["default"])(".sms-passcodes").removeClass("hidden")
                        } else this.submit(e)
                },
                scrollToPasscodeInput: function($passcodeInput) {
                    (0, _jquery["default"])(".base-main").animate({
                        scrollTop: $passcodeInput.offset().top
                    }, 250)
                },
                getNextPasscode: function($passcodeRow) {
                    var val = $passcodeRow.find('[name="next-passcode"]').val();
                    return "None" === val ? null : val
                },
                didChangeDevice: function(e) {
                    this.clearAllMessages(), this.showDevice(this.$el.find(e.currentTarget).val()), this.showPasscodeFieldIfOnlyVisibleFactor()
                },
                didClickDampenChoice: function(e) {
                    var _this3 = this;
                    this.$el.find(".stay-logged-in").addClass("disabled"), this.disableForm();
                    var cookieTester = new _cookieTester.CookieTester;
                    window.cookieTester = cookieTester, cookieTester.startTest().fail(function(err) {
                        _this3.canDampen = !1, _this3.disableDampening()
                    }).then(function(res) {
                        return _this3.enableDampening()
                    })
                },
                didClickPasscodeLabel: function(e) {
                    var $label = this.$el.find(e.currentTarget);
                    $label.find(":radio").prop("checked", !0), $label.find('[name="factor"]').trigger("change")
                },
                didFocusPasscodeButton: function(e) {
                    (0, _jquery["default"])(e.target).siblings('[name="passcode"]').hasClass("hidden") && this.didClickLoginButton(e)
                },
                didFocusPasscode: function(e) {
                    var $passcode = this.$el.find(e.currentTarget);
                    $passcode.siblings(":radio").prop("checked", !0);
                    var smsable = "True" === $passcode.siblings('[name="phone-smsable"]').val(),
                        mobileOtpable = "True" === $passcode.siblings('[name="mobile-otpable"]').val(),
                        hasToken = "true" === this.$el.find('[name="has-token"]').val();
                    this.flashPasscodeMessage(smsable, mobileOtpable, hasToken)
                },
                didClickCancelLink: function(e) {
                    var _this4 = this;
                    this.clearAllMessages();
                    this.flashMessage({
                        message: (0, _gettext.gettext)("Canceling authentication request..."),
                        style: messages.styles.info
                    });
                    var finish = function() {
                        _this4.clearAllMessages(), _this4.flashMessage({
                            message: (0, _gettext.gettext)("Authentication request canceled."),
                            canDismiss: !0,
                            style: messages.styles.info
                        }), _this4.enableForm()
                    };
                    if (this.currentAuthRequest && this.currentAuthRequest.abort(), this.currentAuthPoller) {
                        var txid = this.currentAuthPoller.txid;
                        this.currentAuthPoller.cancel(), http.post(this.url + "/cancel", {
                            sid: this.sid,
                            txid: txid
                        }).fail(function(err) {
                            _this4.clearAllMessages(), _this4.flashMessage({
                                message: (0, _gettext.gettext)("Error cancelling request."),
                                canDismiss: !0,
                                style: messages.styles.error
                            })
                        }).then(function(res) {
                            return finish()
                        })
                    } else finish();
                    this.currentU2FAuthRequest && this.currentU2FAuthRequest.abort(), this.currentWebAuthnAuthRequest && this.currentWebAuthnAuthRequest.abort()
                },
                didClickHelpNav: function() {
                    this.currentAuthRequest && this.currentAuthRequest.abort(), this.currentAuthPoller && this.currentAuthPoller.cancel()
                },
                disableForm: function() {
                    this.$el.find("#login-form").addClass("disabled").find(":input, button").prop("disabled", !0)
                },
                enableForm: function() {
                    this.$el.find("#login-form").removeClass("disabled").find(":input, button").not(this.canDampen ? "" : '[name="dampen_choice"]').prop("disabled", !1)
                },
                disableDampening: function() {
                    this.$el.find('[name="dampen_choice"]').prop("checked", !1).prop("disabled", !0), this.enableForm(), this.flashMessage({
                        message: (0, _gettext.gettext)("You need to enable cookies in order to remember this device."),
                        style: messages.styles.info,
                        canDismiss: !0
                    })
                },
                enableDampening: function() {
                    this.$el.find(".stay-logged-in").removeClass("disabled"), this.$el.find('[name="dampen_choice"]').prop("disabled", !1), this.enableForm()
                },
                startAuthRequest: function(device, factor, passcode, event) {
                    var _this5 = this;
                    void 0 === passcode && (passcode = null), void 0 === event && (event = null);
                    var data = {
                        sid: this.sid,
                        device: device,
                        factor: factor
                    };
                    passcode && (data.passcode = passcode), this.postAuthAction && (data.post_auth_action = this.postAuthAction), this.$el.find('[name="dampen_choice"]').prop("checked") && (data.dampen_choice = !0), data.out_of_date = this.$el.find('[name="out_of_date"]').val(), data.days_out_of_date = this.$el.find('[name="days_out_of_date"]').val(), data.days_to_block = this.$el.find('[name="days_to_block"]').val(), this.setDampenChoice(this.ukey), this.disableForm(), this.currentAuthRequest = http.post(this.url, data).fail(function(err) {
                        err.xhr && "abort" !== err.xhr.statusText && _this5.flashMessage({
                            message: err.message,
                            style: messages.styles.error,
                            canDismiss: !0
                        }), _this5.enableForm()
                    }).then(function(res) {
                        _this5.startPolling(res.txid, event)
                    }).always(function() {
                        return _this5.currentAuthRequest = null
                    })
                },
                startPolling: function(txid, event) {
                    var _this6 = this;
                    void 0 === event && (event = null), this.currentAuthPoller = new poll.Poller(http, "../php/api/status", this.sid, txid);
                    var statusMessages = [];
                    this.currentAuthPoller.on(poll.SUCCESS, function(res) {
                        _this6.finish(txid, res), _this6.currentAuthPoller = null
                    }), this.currentAuthPoller.on(poll.STATUS, function(res) {
                        "cancel" !== res.status_code && statusMessages.push(_this6.flashMessage({
                            message: res.status,
                            style: messages.styles.info,
                            help_link: res.help_link,
                            cancelCallback: function() {
                                return _this6.didClickCancelLink()
                            }
                        }))
                    }), this.currentAuthPoller.on(poll.FAILURE, function(res) {
                        _this6.onPollFailure(res, statusMessages, event)
                    }), this.currentAuthPoller.on(poll.ERROR, function(err) {
                        "abort" !== err.xhr.statusText && err.message && _this6.flashMessage({
                            message: err.message,
                            help_link: err.help_link,
                            style: messages.styles.error,
                            canDismiss: !0
                        }), http.isIndeterminateServerError(err) || (_this6.enableForm(), _this6.currentAuthPoller = null)
                    }), this.currentAuthPoller.start()
                },
                onPollFailure: function(res, msgs, event) {
                    void 0 === event && (event = null), _lodash["default"].forEach(msgs, this.clearMessage);
                    var msg = res.status;
                    if (res.status === AUTH_INCORRECT_PASSCODE_MSG) {
                        var $target = (0, _jquery["default"])(event.target),
                            $parentLabel = $target.closest(".row-label"),
                            smsable = "True" === $target.siblings('[name="phone-smsable"]').val(),
                            mobileOtpable = "True" === $target.siblings('[name="mobile-otpable"]').val(),
                            hasToken = "true" === this.$el.find('[name="has-token"]').val(),
                            nextPasscode = this.getNextPasscode($parentLabel),
                            availableFactorsMsg = this.getPasscodeMessage(smsable, mobileOtpable, hasToken, nextPasscode);
                        msg = (0, _gettext.gettext)("Incorrect passcode.") + " " + availableFactorsMsg
                    }
                    this.flashMessage({
                        message: msg,
                        help_link: res.help_link,
                        style: messages.styles.error,
                        canDismiss: !0
                    }), this.enableForm(), this.currentAuthPoller = null
                },
                startU2FAuthRequest: function() {
                    var _this7 = this;
                    return this.currentU2FAuthRequest = u2f.start(this.url, "../php/api/status", this.sid, this.postAuthAction).fail(function(err) {
                        "abort" !== err.xhr.statusText && _this7.flashMessage({
                            message: err.message,
                            style: messages.styles.error,
                            canDismiss: !0
                        })
                    }).then(function(message, data) {
                        var msg = message;
                        "addDevice" === _this7.postAuthAction ? msg = (0, _gettext.gettext)("Use your Security Key to add a device...") : "manageDevices" === _this7.postAuthAction && (msg = (0, _gettext.gettext)("Use your Security Key to access your settings and devices...")), _this7.flashMessage({
                            message: msg,
                            canDismiss: !0,
                            style: messages.styles.info
                        }), _this7.startU2FPolling(data)
                    }).always(function() {
                        return _this7.currentU2FAuthRequest = null
                    }), this.currentU2FAuthRequest
                },
                startU2FPolling: function(data) {
                    var _this8 = this;
                    this.currentU2FPoller = u2f.sign(data, this.shouldRetryU2FTimeouts).fail(function(err) {
                        _this8.flashMessage({
                            message: err.message,
                            style: messages.styles.error
                        }), window.setTimeout(function() {
                            throw new Error("(U2FError) " + err.message + " Error code: " + err.errorCode)
                        }, 0)
                    }).then(function(data) {
                        return _this8.startU2FValidationRequest(data)
                    }).always(function() {
                        return _this8.currentU2FPoller = null
                    })
                },
                startU2FValidationRequest: function(data) {
                    var _this9 = this,
                        options = {};
                    this.$el.find('[name="dampen_choice"]').prop("checked") && (options.dampen_choice = !0), this.postAuthAction && (options.post_auth_action = this.postAuthAction), options.out_of_date = this.$el.find('[name="out_of_date"]').val(), options.days_out_of_date = this.$el.find('[name="days_out_of_date"]').val(), options.days_to_block = this.$el.find('[name="days_to_block"]').val(), this.setDampenChoice(this.ukey), this.disableForm(), this.currentU2FAuthRequest = u2f.validate(this.url, "../php/api/status", this.sid, data, options).fail(function(err) {
                        _this9.clearAllMessages(), err.status ? _this9.flashMessage({
                            message: err.status,
                            style: messages.styles.error,
                            canDismiss: !0
                        }) : err.xhr && "abort" !== err.xhr.statusText && _this9.flashMessage({
                            message: err.message,
                            style: messages.styles.error,
                            canDismiss: !0
                        }), _this9.enableForm(), _this9.startU2FAuthRequest()
                    }).then(function(txid, res) {
                        return _this9.finish(txid, res)
                    }).always(function() {
                        return _this9.currentU2FAuthRequest = null
                    })
                },
                startWebAuthnAuthRequest: function() {
                    this.setDampenChoice(this.ukey), this.disableForm();
                    var querystringObject = {
                            sid: this.sid,
                            wkey: this.selectedDevice
                        },
                        qs = _querystringEs["default"].encode(querystringObject),
                        urlToOpen = this.url + "/webauthn_auth_popup?" + qs;
                    this.authPopup = window.open(urlToOpen, "AUTH_POPUP", "width=620,height=400,menubar=0,resizable=0,status=1,titlebar=0,toolbar=0");
                    var message = this.authStatusMessage,
                        $deviceEl = this.$el.find('[data-device-index="' + this.selectedDevice + '"]');
                    "addDevice" === this.postAuthAction ? message = $deviceEl.find('[name="add_device_status_msg"]').val() : "manageDevices" === this.postAuthAction && (message = $deviceEl.find('[name="manage_devices_status_msg"]').val()), this.flashMessage({
                        message: (0, _gettext.gettext)(message),
                        canDismiss: !0,
                        style: messages.styles.info
                    }), this.waitForWebauthnPopupResponse()
                },
                _didGetResponseFromPopup: function(event) {
                    var originalEvent = event.originalEvent;
                    if (originalEvent.origin === location.origin) {
                        this.clearAllMessages();
                        var _originalEvent$data = originalEvent.data,
                            type = _originalEvent$data.type,
                            body = _originalEvent$data.body;
                        switch (type) {
                            case _webauthn.WEBAUTHN_AUTH_SUCCESS:
                                this.startWebAuthnValidationRequest(body), this.currentWebAuthnPoller = null, (0, _jquery["default"])(window).off("message");
                                break;
                            case _webauthn.WEBAUTHN_AUTH_FAILED:
                                this.flashMessage({
                                    style: "error",
                                    message: body.message || "Login request denied.",
                                    canDismiss: !0
                                }), (0, _jquery["default"])(window).off("message"), this.enableForm(), body.exception && window.setTimeout(function() {
                                    throw new _webauthn.WebAuthnError(body.exception.message, body.exception.name, body.exception.stack, body.exception.lineNumber)
                                }, 0)
                        }
                    }
                },
                waitForWebauthnPopupResponse: function() {
                    var _this10 = this;
                    (0, _jquery["default"])(window).on("message", function(e) {
                        return _this10._didGetResponseFromPopup(e)
                    })
                },
                startWebAuthnValidationRequest: function(assertionInfo) {
                    var _this11 = this,
                        options = {};
                    this.$el.find('[name="dampen_choice"]').prop("checked") && (options.dampen_choice = !0), this.postAuthAction && (options.post_auth_action = this.postAuthAction), options.out_of_date = this.$el.find('[name="out_of_date"]').val(), options.days_out_of_date = this.$el.find('[name="days_out_of_date"]').val(), options.days_to_block = this.$el.find('[name="days_to_block"]').val(), this.currentWebAuthnAuthRequest = _webauthn["default"].validate(this.url, "../php/api/status", this.sid, assertionInfo, options).fail(function(err) {
                        _this11.clearAllMessages(), err.status ? _this11.flashMessage({
                            message: err.status,
                            help_link: err.help_link,
                            style: messages.styles.error,
                            canDismiss: !0
                        }) : err.xhr && "abort" !== err.xhr.statusText && _this11.flashMessage({
                            message: err.message,
                            style: messages.styles.error,
                            canDismiss: !0
                        }), _this11.enableForm()
                    }).then(function(txid, res) {
                        return _this11.finish(txid, res)
                    }).always(function() {
                        return _this11.currentWebAuthnAuthRequest = null
                    })
                },
                finish: function(txid, res) {
                    var _this12 = this,
                        flashSuccessMessage = function() {
                            _this12.clearAllMessages(), _this12.flashMessage({
                                message: (0, _gettext.gettext)("Success! Logging you in..."),
                                style: messages.styles.success
                            })
                        };
                    this.authPopup && this.authPopup.close && this.authPopup.close();
                    var args = {
                        sid: this.sid,
                        txid: txid
                    };
                    "manageDevices" === res.post_auth_action ? this.redirect("/frame/enroll/finish?" + _jquery["default"].param(args)) : "restore" === res.post_auth_action ? this.redirect("/frame/enroll/mobile_restore?" + _jquery["default"].param(args)) : "addDevice" === res.post_auth_action ? this.redirect("/frame/enroll/flow?" + _jquery["default"].param(args)) : "outOfDate" === res.post_auth_action ? (args.authed = !0, args.parent = res.parent, this.redirect("/frame/prompt/update?" + _jquery["default"].param(args))) : "reenroll_u2f_as_webauthn" === res.post_auth_action ? (args.parent = res.parent, this.redirect("/frame/enroll/reenroll_u2f_as_webauthn?" + _jquery["default"].param(args))) : "oidc_exit" === res.post_auth_action ? (flashSuccessMessage(), this.$oidcExitForm = this.$el.find(".oidc-exit-form"), this.$oidcExitForm.find('[name="txid"]').val(txid), this.$oidcExitForm.submit()) : (flashSuccessMessage(), _jquery["default"].postMessage(res.cookie, res.parent, parent))
                },
                sendSMSCodes: function() {
                    var _this13 = this,
                        device = this.$el.find('[name="device"]').val();
                    http.post(this.url, {
                        sid: this.sid,
                        device: device,
                        factor: "sms"
                    }).fail(function(err) {
                        _this13.flashMessage({
                            message: err.message,
                            style: messages.styles.error,
                            canDismiss: !0
                        })
                    }).then(function(res) {
                        _this13.flashMessage({
                            message: (0, _gettext.gettext)("Successfully sent codes."),
                            style: messages.styles.info,
                            canDismiss: !0
                        })
                    }).always(function() {
                        _this13.clearMessage(_this13.smsMessage)
                    })
                },
                showDevice: function(device) {
                    this.$el.find("fieldset").not(".device-selector").addClass("hidden").filter('[data-device-index="' + device + '"]').removeClass("hidden").find(":radio").first().prop("checked", !0)
                },
                _getDampenChoiceLocalStorageKey: function(ukey) {
                    return ukey + "-dampen-choice"
                },
                loadDampenChoice: function(ukey) {
                    if ((0, _util.isLocalStorageSupported)()) {
                        var dampenChoiceKeyV2 = this._getDampenChoiceLocalStorageKey(ukey),
                            dampenChoice = window.localStorage.getItem(dampenChoiceKeyV2) || window.localStorage.getItem("dampen_choice");
                        dampenChoice && this.$el.find('[name="dampen_choice"]').prop("checked", "true" === dampenChoice)
                    }
                },
                setDampenChoice: function(ukey) {
                    if ((0, _util.isLocalStorageSupported)()) {
                        var dampenChoice = this.$el.find('[name="dampen_choice"]').prop("checked");
                        if ("boolean" == typeof dampenChoice) {
                            var dampenChoiceKeyV2 = this._getDampenChoiceLocalStorageKey(ukey);
                            window.localStorage.setItem(dampenChoiceKeyV2, dampenChoice ? "true" : "false"), window.localStorage.removeItem("dampen_choice")
                        }
                    }
                },
                checkDevicePreferences: function() {
                    var preferredFactor = this.$el.find('[name="preferred_factor"]').val(),
                        preferredDevice = this.$el.find('[name="preferred_device"]').val();
                    if (preferredDevice) {
                        var $deviceSelector = this.$el.find('[name="device"]');
                        if (!(0 !== $deviceSelector.find('[value="' + preferredDevice + '"]').length)) return void setTimeout(function() {
                            throw new Error('Preferred device "' + preferredDevice + '" does not exist on page.')
                        }, 0);
                        $deviceSelector.val(preferredDevice).trigger("change"), this.showDevice(preferredDevice), this.$el.find("fieldset").filter('[data-device-index="' + preferredDevice + '"]').find('[value="' + preferredFactor + '"]').prop("checked", !0), "Duo Push" !== preferredFactor && "Phone Call" !== preferredFactor || this.startAuthRequest(preferredDevice, preferredFactor)
                    }
                },
                hasSupportedU2FToken: function() {
                    return this.$el.find('[name="factor"][value="U2F Token"]').length > 0
                },
                hasSupportedWebAuthnCredential: function() {
                    return this.$el.find('[name="factor"][value="WebAuthn Credential"]').length > 0
                },
                visibleDeviceOnlyHasPasscodeFactor: function() {
                    return 1 === this.getVisibleFieldset().find(".passcode-label").find(".passcode-input").length && 1 === this.countVisibleAuthFactors()
                },
                countVisibleAuthFactors: function() {
                    return this.getVisibleFieldset().find(".row-label").length
                },
                getVisibleFieldset: function() {
                    return this.$("fieldset").filter("[data-device-index]").filter(':not(".hidden")')
                },
                clearMessage: function(msg) {
                    return messages.clearMessage(msg)
                },
                clearAllMessages: function() {
                    return messages.clearAllMessages()
                },
                flashMessage: function(msg) {
                    return messages.flashMessage(msg)
                },
                flashOutOfDate: function() {
                    if (this.outOfDate) {
                        var days_ood = this.$el.find('[name="days_out_of_date"]').val(),
                            days_to_block = this.$el.find('[name="days_to_block"]').val(),
                            params = {
                                sid: this.sid,
                                authed: !1
                            },
                            qs = _querystringEs["default"].encode(params),
                            message = (0, _gettext.gettext)("Your computer software is out of date."),
                            msg_style = messages.styles.warning;
                        days_to_block > 0 ? (message = days_to_block > 30 ? (0, _gettext.format)((0, _gettext.ngettext)("Your computer software is out of date. You will be blocked in a month if you don't update.", "Your computer software is out of date. You will be blocked in %s months if you don't update.", Math.floor(days_to_block / 30)), Math.floor(days_to_block / 30)) : (0, _gettext.format)((0, _gettext.ngettext)("Your computer software is out of date. You will be blocked in %s day if you don't update.", "Your computer software is out of date. You will be blocked in %s days if you don't update.", days_to_block), days_to_block), msg_style = messages.styles.error) : days_ood > 0 && (message = days_ood > 365 ? (0, _gettext.format)((0, _gettext.ngettext)("Your computer software is over a year out of date.", "Your computer software is over %s years out of date.", Math.floor(days_ood / 365)), Math.floor(days_ood / 365)) : days_ood > 30 ? (0, _gettext.format)((0, _gettext.ngettext)("Your computer software is over a month out of date.", "Your computer software is over %s months out of date.", Math.floor(days_ood / 30)), Math.floor(days_ood / 30)) : (0, _gettext.format)((0, _gettext.ngettext)("Your computer software is %s day out of date.", "Your computer software is %s days out of date.", days_ood), days_ood)), this.flashMessage({
                            message: message,
                            style: msg_style,
                            canDismiss: !0,
                            link: {
                                href: "/frame/prompt/update?" + qs,
                                text: (0, _gettext.gettext)("Let's update it")
                            }
                        })
                    }
                },
                flashEnrollmentMessage: function() {
                    this.enrollmentMessage && this.flashMessage({
                        message: this.enrollmentMessage,
                        style: messages.styles.success,
                        canDismiss: !0
                    })
                },
                redirect: function(location) {
                    window.location = location
                }
            });
        exports["default"] = _default
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
    function(module, exports, __webpack_require__) {
        "use strict";
        var _jquery = _interopRequireDefault(__webpack_require__(37)),
            _promptView = _interopRequireDefault(__webpack_require__(131));

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }(0, _jquery["default"])(document).ready(function() {
            var promptView = new _promptView["default"]({
                el: (0, _jquery["default"])(".base-wrapper")
            });
            (0, _jquery["default"])(document).keypress(function(e) {
                e.target.href || promptView.didPressEnter(e)
            }), (0, _jquery["default"])(".helptext").tipsy({
                gravity: "w",
                live: !0,
                html: !0
            })
        })
    },
    function(module, exports, __webpack_require__) {
        __webpack_require__(107), module.exports = __webpack_require__(168)
    }
]);
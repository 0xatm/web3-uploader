var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// @ts-ignore
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './uploader.css';
var Web3Uploader = function (_a) {
    var apiToken = _a.apiToken, accept = _a.accept, _b = _a.maxFiles, maxFiles = _b === void 0 ? 0 : _b, onLoading = _a.onLoading, onUploaded = _a.onUploaded, _c = _a.disabled, disabled = _c === void 0 ? false : _c, _d = _a.canUpload, canUpload = _d === void 0 ? true : _d;
    var _e = useState([]), files = _e[0], setFiles = _e[1];
    var _f = useState(), storage = _f[0], setStorage = _f[1];
    useEffect(function () {
        setStorage(new Web3Storage({ token: apiToken }));
    }, []);
    useEffect(function () {
        if (files.length > 0 && canUpload && storage) {
            files.forEach(function (file) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    URL.revokeObjectURL(file.preview);
                    return [2 /*return*/];
                });
            }); });
            upload(files);
        }
    }, [files, canUpload, storage]);
    var upload = function (fileList) { return __awaiter(void 0, void 0, void 0, function () {
        var onRootCidReady, totalSize, uploaded, onStoredChunk, rootCid, res, _a, ret, files, _i, files_1, file;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    onRootCidReady = function (cid) {
                        console.log('uploading files with cid:', cid);
                    };
                    totalSize = fileList.map(function (f) { return f.size; }).reduce(function (a, b) { return a + b; }, 0);
                    uploaded = 0;
                    onStoredChunk = function (size) {
                        uploaded += size;
                        var pct = totalSize / uploaded;
                        console.log("Uploading... " + pct.toFixed(2) + "% complete");
                    };
                    return [4 /*yield*/, (storage === null || storage === void 0 ? void 0 : storage.put(fileList, { onRootCidReady: onRootCidReady, onStoredChunk: onStoredChunk }))];
                case 1:
                    rootCid = _b.sent();
                    _a = rootCid;
                    if (!_a) return [3 /*break*/, 3];
                    return [4 /*yield*/, (storage === null || storage === void 0 ? void 0 : storage.get(rootCid))];
                case 2:
                    _a = (_b.sent());
                    _b.label = 3;
                case 3:
                    res = _a;
                    if (!(res === null || res === void 0 ? void 0 : res.ok)) {
                        throw new Error("failed to get " + rootCid + " - [" + (res === null || res === void 0 ? void 0 : res.status) + "] " + (res === null || res === void 0 ? void 0 : res.statusText));
                    }
                    ret = [];
                    return [4 /*yield*/, res.files()];
                case 4:
                    files = _b.sent();
                    for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
                        file = files_1[_i];
                        ret.push({ name: file.name, cid: file.cid });
                    }
                    onUploaded(rootCid, ret);
                    return [2 /*return*/];
            }
        });
    }); };
    // @ts-ignore
    var uploadFileToFilecoin = function (file) {
        onLoading(true);
        var reader = new FileReader();
        reader.onabort = function () { throw Error("File " + file.name + " reading was aborted"); };
        reader.onerror = function () { throw Error("File " + file.name + " reading has failed"); };
        reader.onloadend = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); };
        reader.readAsArrayBuffer(file);
    };
    var _g = useDropzone({
        accept: accept,
        maxFiles: maxFiles,
        disabled: disabled,
        onDrop: function (acceptedFiles) {
            setFiles(acceptedFiles.map(function (file) {
                return Object.assign(file, {
                    preview: URL.createObjectURL(file)
                });
            }));
        }
    }), getRootProps = _g.getRootProps, getInputProps = _g.getInputProps;
    return (React.createElement("section", { className: "container" },
        React.createElement("div", __assign({}, getRootProps({ className: "dropzone" })),
            React.createElement("input", __assign({}, getInputProps())),
            React.createElement("p", null, "Drag 'n' drop some files here, or click to select files"),
            accept ? "<em>(Only " + accept + " will be accepted)</em>" : '',
            maxFiles ? "<em>(" + maxFiles + " files are the maximum number of files you can drop here)</em>" : '')));
};
export default Web3Uploader;

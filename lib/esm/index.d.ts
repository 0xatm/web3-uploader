/// <reference types="react" />
import './uploader.css';
interface Uploader {
    apiToken: string;
    onLoading: (isLoading: boolean) => void;
    onUploaded: (cid: undefined, ret: Upload[]) => void;
    accept?: string | string[];
    maxFiles?: number;
    isFileLoading?: boolean;
    canUpload?: boolean;
}
interface Upload {
    name: string;
    cid: string;
}
declare const Web3Uploader: ({ apiToken, accept, maxFiles, onLoading, onUploaded, isFileLoading, canUpload }: Uploader) => JSX.Element;
export default Web3Uploader;

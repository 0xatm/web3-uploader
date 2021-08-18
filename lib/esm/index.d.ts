/// <reference types="react" />
import { CIDString } from 'web3.storage/dist/src/lib/interface';
import './uploader.css';
interface Uploader {
    apiToken: string;
    onLoading: (isLoading: boolean) => void;
    onUploaded: (cid: CIDString | undefined, ret: Upload[]) => void;
    accept?: string | string[];
    maxFiles?: number;
    disabled?: boolean;
    canUpload?: boolean;
}
interface Upload {
    name: string;
    cid: string;
}
declare const Web3Uploader: ({ apiToken, accept, maxFiles, onLoading, onUploaded, disabled, canUpload }: Uploader) => JSX.Element;
export default Web3Uploader;

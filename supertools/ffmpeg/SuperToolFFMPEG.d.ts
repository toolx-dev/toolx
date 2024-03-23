export default SuperToolFFMPEG;
/**
 * SuperToolFFMPEG
 * @template {new (...args: any[]) => any} T
 * @param {T} superclass - The class to extend
 */
declare function SuperToolFFMPEG<T extends new (...args: any[]) => any>(superclass: T): {
    new (...args: any[]): {
        [x: string]: any;
        progressStep: number;
        getProgressFFMPEG(data: any): {};
        ffmpegProcess(command: any, file: any, progressKey: any): Promise<any>;
        onEveryFile(next: any, { file, files, options }: {
            file: any;
            files: any;
            options: any;
        }): Promise<void>;
        progressCount: any;
    };
} & T;

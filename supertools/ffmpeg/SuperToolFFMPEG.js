import path from 'node:path'
import { spawn } from 'node:child_process'
import ffmpeg from '@ffmpeg-installer/ffmpeg'

/**
 * SuperToolFFMPEG
 * @template {new (...args: any[]) => any} T
 * @param {T} superclass - The class to extend
 */
const SuperToolFFMPEG = (superclass) =>
    class extends superclass {
        progressStep = 0

        getProgressFFMPEG(data) {
            let tLines = data.toString().split('\n');
            let progress = {};
            for (let i = 0; i < tLines.length; i++) {
                let item = tLines[i].split('=');
                if (typeof item[0] != 'undefined' && typeof item[1] != 'undefined') {
                    progress[item[0]] = item[1];
                }
            }
            return progress;
        }

        ffmpegProcess(command, file, progressKey) {
            return new Promise((resolve) => {
                const ffmpegInstance = spawn(`${ffmpeg.path} -hide_banner -loglevel error -progress pipe:1 ` + command, {
                    shell: true,
                    cwd: path.dirname(file)
                });

                ffmpegInstance.on('close', function () {
                    resolve(file);
                });

                ffmpegInstance.stdout.on('data', (data) => {
                });

                ffmpegInstance.stderr.on('data', (data) => {
                    if (this.options.debug) console.error(`child stderr:\n${data}`);
                });

                ffmpegInstance.on('error', function (err) {
                    if (this.options.debug) console.log(err);
                });
            });
        }

        async onEveryFile(next, { file, files, options }) {
            this.progressStep += 1;
            this.progressCount = files.length;

            await this.ffmpegProcess(options.command, file)

            next(file);
        }
    }


export default SuperToolFFMPEG
import Tool from '@toolx/core/Tool.server.js';
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';
class ToolSharp extends Tool {
    options = {
        exts: ['jpg', 'jpeg', 'png', 'webp', 'tiff', 'gif', 'avif', 'heif', 'svg'],
    }

    async onEveryFile(next, { file, options }) {
        const processor = sharp(file, options?.settings)
        const apis = options?.api;

        /**
         * meta = format,width,height,space,channels,depth,density,isProgressive,hasProfile,hasAlpha
         */
        const meta = await processor.metadata();

        if (apis) {
            Object.keys(apis).forEach((api) => {
                if (api) {
                    if (apis[api]?.args) {
                        processor[api](...[apis[api].args])
                    } else {
                        processor[api](apis[api])
                    }
                }
            })
        }

        if (options?.scale) {
            processor.resize(Math.round(meta.width * options.scale))
        }

        processor.toBuffer({ resolveWithObject: !!options?.resolveWithObject }).then((data) => {
            const _file = options.ext ? file.replace(path.extname(file), options.ext) : file;
            if (options?.onBuffer) {
                const buffer = options.onBuffer(data);
                if (buffer) fs.writeFileSync(_file, buffer);
            } else {
                fs.writeFileSync(_file, data);
            }
            next(_file)
        }).catch((err) => { console.log(err) })
    }
}

export default ToolSharp
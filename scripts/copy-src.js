import fse from 'fs-extra';
import {promises as fsp} from 'fs';

(async () => {
    console.log('Copied:');
    await fsp.rmdir('lib', {recursive: true});
    await fse.copy('src', 'lib');
})().catch((err) => {
    console.log(err);
    process.exit(1);
});

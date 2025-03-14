import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the absolute path to the CMS config file
const CONFIG_PATH = path.resolve(__dirname, "../../config/cms.js");
const SCRIPT_DIR = path.resolve(__dirname, "../../");

export default class CMSService {
    getCMSConfiguration = async () => {
        const { pagesConfig } = await import('../../config/cms.js?update=' + Date.now()); // Prevents caching
        return pagesConfig;
    }


    updateCMSConfiguration = (newConfig) => {
        // Read the existing config
        const updatedConfig = {
            ...newConfig, // Ensure new values are merged correctly
        };

        // Convert the object into a valid JS module with export
        const fileContent = `export const pagesConfig = ${JSON.stringify(updatedConfig, null, 2)};`;

        // Write the file
        fs.writeFile(CONFIG_PATH, fileContent, (err) => {
            if (err) {
                console.error("Error writing config file:", err);
            } else {
                console.log("CMS config updated successfully.");
            }
        });

        exec(`cd ${SCRIPT_DIR} && bash setup.sh local`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing setup script: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Setup script error output: ${stderr}`);
                return;
            }
            console.log(`Setup script output: ${stdout}`);
        });

        return {
            message: 'Updated CMS Config file'
        }
    };   
}
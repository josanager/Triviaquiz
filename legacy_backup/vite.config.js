import { defineConfig } from 'vite';
import { exec } from 'child_process';

export default defineConfig({
    plugins: [
        {
            name: 'auto-export-trigger',
            configureServer(server) {
                // API endpoint that triggers npm run export
                server.middlewares.use('/api/trigger-export', (req, res) => {
                    console.log('');
                    console.log('🚀 ============================================');
                    console.log('🎬 EXPORT TRIGGERED BY BROWSER RELOAD!');
                    console.log('🚀 ============================================');
                    console.log('');

                    // Run npm run export:timecut in the background
                    const child = exec('npm run export:timecut', { cwd: process.cwd() });

                    child.stdout.on('data', (data) => {
                        process.stdout.write(data);
                    });

                    child.stderr.on('data', (data) => {
                        process.stderr.write(data);
                    });

                    child.on('close', (code) => {
                        console.log('');
                        console.log('✅ Export process finished with code:', code);
                        console.log('');
                    });

                    // Respond immediately (export runs in background)
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'export-started' }));
                });
            }
        }
    ]
});

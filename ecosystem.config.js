const isDev = process.env.NODE_ENV === 'development';
const name = 'eklaim_ws_' + process.env.NODE_ENV;
module.exports = {
    apps: [
        {
            name: name,
            script: 'src/index.js',
            ignore_watch: [
                'node_modules',
                'data',
                '.git',
                '*.log',
                'logs',
                'temp',
                'dist'
            ],
            instances: isDev ? 1 : 6,
            exec_mode: 'cluster',
            watch: isDev ? true : false,
            max_memory_restart: '2048M',
            exp_backoff_restart_delay: 100,
            max_restarts: 5,
            min_uptime: 5000,
            restart_delay: 5000,
            cron_restart: '0 3 * * *',
            node_args: '--max_old_space_size=2048',
            env_development: {
                NODE_ENV: 'development',
                WATCH: true
            },
            env_staging: {
                NODE_ENV: 'staging'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};

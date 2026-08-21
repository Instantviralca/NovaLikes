module.exports = {
  apps: [
    {
      name: 'novalikes',
      cwd: '/var/www/novalikes',
      script: './node_modules/next/dist/bin/next',
      args: 'start -H 127.0.0.1 -p 3000',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        HOSTNAME: '127.0.0.1',
        PORT: '3000',
      },
    },
  ],
};

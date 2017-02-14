module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'Gitter-clone',
      script: './static/compiled/',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'deploy',
      host: '138.68.24.248',
      ref: 'origin/master',
      repo: 'git@github.com:tylercrosse/gitter-clone.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production'
    },
    dev: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/development',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.json --env dev',
      env: {
        NODE_ENV: 'dev'
      }
    }
  }
};

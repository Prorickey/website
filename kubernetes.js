const k8s = require('@kubernetes/client-node');
const { version } = require('./package.json');
const { config } = require('dotenv');
config({ path: '.env.local' });

const kc = new k8s.KubeConfig();
kc.loadFromOptions({
  clusters: [
    {
      name: 'prorickey-cluster',
      server: 'https://kapi.prorickey.xyz',
      skipTLSVerify: true,
      caData: process.env.KUBECONFIGCERT,
    },
  ],

  users: [
    {
      name: 'prorickey-portfolio-sa',
      token: process.env.KUBECONFIGTOKEN,
    },
  ],

  contexts: [
    {
      name: 'prorickey-context',
      context: {
        cluster: 'prorickey-cluster',
        user: 'prorickey-portfolio-sa',
        namespace: 'prorickey',
      },
    },
  ],

  currentContext: 'prorickey-context',
});

const k8sApi = kc.makeApiClient(k8s.AppsV1Api);

(async () => {
  try {
    const deployment = (
      await k8sApi.readNamespacedDeployment('portfolio', 'prorickey')
    ).body;

    deployment.spec.template.spec.containers[0].image = `docker.prorickey.xyz/prorickey/nextjs-portfolio:${version}`;
    deployment.spec.replicas = 3;

    await k8sApi.replaceNamespacedDeployment(
      'portfolio',
      'prorickey',
      deployment
    );
  } catch (err) {
    console.error(err);
  }
})();

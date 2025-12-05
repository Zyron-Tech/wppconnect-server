import { ServerOptions } from './types/ServerOptions';

export default {
  secretKey: 'LOADING',
  host: '0.0.0.0',
  port: '21465',
  headless: true, // MUST BE TRUE ON RENDER
  autoClose: 0,
  deviceName: 'WppConnect',
  poweredBy: 'WPPConnect-Server',
  startAllSession: true,
  tokenStoreType: 'file',
  maxListeners: 15,
  customUserDataDir: './userDataDir',
  
webhook: {
  url: "",
  autoDownload: true,
  uploadS3: false,
  readMessage: true,
  allUnreadOnStart: false,
  listenAcks: true,
  onPresenceChanged: true,
  onParticipantsChanged: true,
  onReactionMessage: true,
  onPollResponse: true,
  onRevokedMessage: true,
  onLabelUpdated: true,
  onSelfMessage: false,
  ignore: ['status@broadcast'],
  active: false
},

  websocket: {
    autoDownload: false,
    uploadS3: false,
  },

  chatwoot: {
    sendQrCode: true,
    sendStatus: true,
  },

  archive: {
    enable: false,
    waitTime: 10,
    daysToArchive: 45,
  },

  log: {
    level: 'silly',
    logger: ['console', 'file'],
  },

  createOptions: {
    headless: true, // VERY IMPORTANT ON RENDER
    browserArgs: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--aggressive-cache-discard',
      '--disable-cache',
      '--disable-application-cache',
      '--disable-offline-load-stale-cache',
      '--disk-cache-size=0',
      '--disable-background-networking',
      '--disable-default-apps',
      '--disable-extensions',
      '--disable-sync',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-translate',
      '--hide-scrollbars',
      '--metrics-recording-only',
      '--mute-audio',
      '--no-first-run',
      '--safebrowsing-disable-auto-update',
      '--ignore-certificate-errors',
      '--ignore-ssl-errors',
    ],
    linkPreviewApiServers: null,
  },

  mapper: {
    enable: false,
    prefix: 'tagone-',
  },

  db: {
    mongodbDatabase: 'tokens',
    mongodbCollection: '',
    mongodbUser: '',
    mongodbPassword: '',
    mongodbHost: '',
    mongoIsRemote: true,
    mongoURLRemote: '',
    mongodbPort: 27017,
    redisHost: 'localhost',
    redisPort: 6379,
    redisPassword: '',
    redisDb: 0,
    redisPrefix: 'docker',
  },

  aws_s3: {
    region: 'sa-east-1',
    access_key_id: null,
    secret_key: null,
    defaultBucketName: null,
    endpoint: null,
    forcePathStyle: null,
  },
} as unknown as ServerOptions;

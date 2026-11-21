/**
 * Bundled by jsDelivr using Rollup v4.62.2 and esbuild v0.28.1.
 * Original file: /npm/@elevenlabs/client@1.37.1/dist/platform/web/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import{DisconnectReason as k,Track as v,Room as Ie,RoomEvent as y,ConnectionState as te,createLocalAudioTrack as Me}from"./livekit-client.mjs";class ne{queue=[];outgoingQueue=[];disconnectionDetails=null;onDisconnectCallback=null;onMessageCallback=null;onModeChangeCallback=null;onDebug;onOutgoingMessageCallback=null;constructor(e={}){this.onDebug=e.onDebug}debug(e){this.onDebug&&this.onDebug(e)}onMessage(e){this.onMessageCallback=e;const t=this.queue;this.queue=[],t.length>0&&queueMicrotask(()=>{t.forEach(e)})}onDisconnect(e){this.onDisconnectCallback=e;const t=this.disconnectionDetails;t&&queueMicrotask(()=>{e(t)})}onModeChange(e){this.onModeChangeCallback=e}onOutgoingMessage(e){this.onOutgoingMessageCallback=e;const t=this.outgoingQueue;this.outgoingQueue=[],t.length>0&&queueMicrotask(()=>{t.forEach(e)})}updateMode(e){this.onModeChangeCallback?.(e)}disconnect(e){this.disconnectionDetails||(this.disconnectionDetails=e,this.onDisconnectCallback?.(e))}handleMessage(e){this.onMessageCallback?this.onMessageCallback(e):this.queue.push(e)}handleOutgoingMessage(e){this.onOutgoingMessageCallback?this.onOutgoingMessageCallback(e):this.outgoingQueue.push(e)}}function D(o){const[e,t]=o.split("_");if(!["pcm","ulaw"].includes(e))throw new Error(`Invalid format: ${o}`);const n=Number.parseInt(t);if(Number.isNaN(n))throw new Error(`Invalid sample rate: ${t}`);return{format:e,sampleRate:n}}function T(o){return o!=null&&typeof o=="object"&&!Array.isArray(o)}function Re(o,e="Expected a JSON object"){if(!T(o))throw new Error(e)}async function oe(o){try{const e=await o.json();if(!T(e))return o.statusText||"Unknown error";const t=e.detail,n=T(t)?t.message:t;if(typeof n=="string")return n}catch(e){console.warn("Failed to parse API error response as JSON:",e)}return o.statusText||"Unknown error"}class W extends Error{closeCode;closeReason;constructor(e,t){super(e),this.name="SessionConnectionError",this.closeCode=t?.closeCode,this.closeReason=t?.closeReason}}const Pe="1.37.1";let x=Object.freeze({name:"js_sdk",version:Pe});function O(o){return!!o.type}const ie="conversation_initiation_client_data";function se(o){const e={type:ie};if(o.overrides){const t=o.overrides.turn;e.conversation_config_override={agent:{prompt:o.overrides.agent?.prompt,first_message:o.overrides.agent?.firstMessage,language:o.overrides.agent?.language,max_conversation_duration_message:o.overrides.agent?.maxConversationDurationMessage},tts:{voice_id:o.overrides.tts?.voiceId,...o.overrides.tts?.modelId!==void 0?{model_id:o.overrides.tts.modelId}:{},speed:o.overrides.tts?.speed,stability:o.overrides.tts?.stability,similarity_boost:o.overrides.tts?.similarityBoost,clone_strength:o.overrides.tts?.cloneStrength,pronunciation_dictionary_locators:o.overrides.tts?.pronunciationDictionaryLocators,supported_voices:o.overrides.tts?.supportedVoices},...o.overrides.asr?.keywords!==void 0?{asr:{keywords:o.overrides.asr.keywords}}:{},conversation:{text_only:o.overrides.conversation?.textOnly,max_duration_seconds:o.overrides.conversation?.maxDurationSeconds},...t!==void 0?{turn:{...t.softTimeoutConfig!==void 0?{soft_timeout_config:{message:t.softTimeoutConfig.message,additional_soft_timeout_messages:t.softTimeoutConfig.additionalSoftTimeoutMessages}}:{},noisy_environment_message:t.noisyEnvironmentMessage}}:{}}}return o.branchId!==void 0&&(e.branch_id=o.branchId),o.startingWorkflowNodeId!==void 0&&(e.starting_workflow_node_id=o.startingWorkflowNodeId),o.procedureIds!==void 0&&(e.procedure_ids=o.procedureIds),o.startProcedureIds!==void 0&&(e.start_procedure_ids=o.startProcedureIds),o.customLlmExtraBody&&(e.custom_llm_extra_body=o.customLlmExtraBody),o.dynamicVariables&&(e.dynamic_variables=o.dynamicVariables),o.userId&&(e.user_id=o.userId),e.source_info={source:x.name,version:x.version},o.toolMockConfig&&(e.tool_mock_config={mocking_strategy:o.toolMockConfig.mockingStrategy,mocked_tool_names:o.toolMockConfig.mockedToolNames,fallback_strategy:o.toolMockConfig.fallbackStrategy}),e}function B(o){const e=new Uint8Array(o);return btoa(String.fromCharCode(...e))}function De(o){const e=atob(o),t=e.length,n=new Uint8Array(t);for(let i=0;i<t;i++)n[i]=e.charCodeAt(i);return n.buffer}const L={getVolume:()=>0,getByteFrequencyData:()=>{}},xe=100,Oe=8e3;function re(o,e,t){const n=o.length,i=t/2/n,s=Math.floor(xe/i),r=Math.min(Math.ceil(Oe/i),n),a=r-s,c=e.length;for(let l=0;l<c;l++){const d=l/c*a,h=s+Math.floor(d),m=Math.min(h+1,r-1),p=d-Math.floor(d);e[l]=Math.round(o[h]*(1-p)+o[m]*p)}}let ae;function Le(o){ae=o}function Fe(){return ae?.()??null}const Ue="wss://livekit.rtc.elevenlabs.io",Ne="https://api.elevenlabs.io",Ve=.01;function q(o,e){try{const t=JSON.parse(o.metadata??"null");return T(t)&&T(t.avatar)&&t.avatar.participant_identity===e.identity}catch{return!1}}const $e=new Set([k.CLIENT_INITIATED,k.PARTICIPANT_REMOVED,k.ROOM_DELETED,k.ROOM_CLOSED]);function We(o){return o.replace(/^wss:\/\//,"https://")}class M extends ne{conversationId;inputFormat;outputFormat;room;isConnected=!1;audioEventId=1;outputDeviceId=null;audioAdapter;workletPaths;inputAnalyser=void 0;inputVolumeProvider=L;outputAnalyser=void 0;outputVolumeProvider=L;agentAudioTrack=null;avatarAudioTrack=null;capturedTrack=null;voice="agent";avatarVideoTrack=null;avatarVideoTrackListeners=new Set;_isMuted=!1;input={close:async()=>{if(this.isConnected)try{this.room.localParticipant.audioTrackPublications.forEach(e=>{e.track&&e.track.stop()})}catch(e){console.warn("Error stopping local tracks:",e)}},setDevice:async e=>{if(e?.sampleRate!==void 0||e?.format!==void 0||e?.preferHeadphonesForIosDevices!==void 0)throw new Error("WebRTC input device does not support sampleRate, format, or preferHeadphonesForIosDevices options");const t=e?.inputDeviceId;t&&await this.setAudioInputDevice(t)},setMuted:async e=>{if(!this.isConnected||!this.room.localParticipant){console.warn("Cannot set microphone muted: room not connected or no local participant");return}this._isMuted=e;const t=this.room.localParticipant.getTrackPublication(v.Source.Microphone);if(t?.track)try{e?await t.track.mute():await t.track.unmute()}catch{await this.room.localParticipant.setMicrophoneEnabled(!e)}else await this.room.localParticipant.setMicrophoneEnabled(!e);if(!e){const n=this.room.localParticipant.getTrackPublication(v.Source.Microphone)?.track;n&&this.setupInputAnalyser(n.mediaStreamTrack)}},isMuted:()=>this._isMuted,getAnalyser:()=>this.inputAnalyser,getVolume:()=>this._isMuted?0:this.inputVolumeProvider.getVolume(),getByteFrequencyData:e=>{if(this._isMuted){e.fill(0);return}this.inputVolumeProvider.getByteFrequencyData(e)}};output={close:async()=>{},setDevice:async e=>{if(e?.sampleRate!==void 0||e?.format!==void 0)throw new Error("WebRTC output device does not support sampleRate or format options");const t=e?.outputDeviceId;t&&await this.setAudioOutputDevice(t)},setVolume:e=>{this.setAudioVolume(e)},interrupt:e=>{},getAnalyser:()=>this.outputAnalyser,getVolume:()=>this.outputVolumeProvider.getVolume(),getByteFrequencyData:e=>{this.outputVolumeProvider.getByteFrequencyData(e)}};constructor(e,t,n,i,s={}){super(s),this.room=e,this.conversationId=t,this.inputFormat=n,this.outputFormat=i,this.audioAdapter=Fe(),this.workletPaths=s.workletPaths,this.setupRoomEventListeners()}static async create(e){let t;if("conversationToken"in e&&e.conversationToken)t=e.conversationToken;else if("agentId"in e&&e.agentId)try{const{name:s,version:r}=x,a=e.origin??Ne;let l=`${We(a)}/v1/convai/conversation/token?agent_id=${e.agentId}&source=${s}&version=${r}`;e.environment&&(l+=`&environment=${encodeURIComponent(e.environment)}`);const d=await fetch(l);if(!d.ok){const m=await oe(d);throw new Error(`ElevenLabs API returned ${d.status} ${m}`)}const h=await d.json();if(!T(h)||typeof h.token!="string")throw new Error("No conversation token received from API");if(t=h.token,!t)throw new Error("No conversation token received from API")}catch(s){let r=s instanceof Error?s.message:String(s);throw s instanceof Error&&s.message.includes("401")&&(r="Your agent has authentication enabled, but no signed URL or conversation token was provided."),new Error(`Failed to fetch conversation token for agent ${e.agentId}: ${r}`)}else throw new Error("Either conversationToken or agentId is required for WebRTC connection");const n=e.webRtc?.singlePeerConnection,i=new Ie(n===void 0?void 0:{singlePeerConnection:n});try{const s=`room_${Date.now()}`,r=D("pcm_48000"),a=D("pcm_48000"),c=new M(i,s,r,a,e),l=e.livekitUrl||Ue,d=e.textOnly?Promise.resolve():new Promise((f,g)=>{i.once(y.SignalConnected,()=>{c.enableMicrophone(e.inputDeviceId).then(()=>f()).catch(g)})}),h=e.webRtc?.iceTransportPolicy;await i.connect(l,t,{rtcConfig:h?{iceTransportPolicy:h}:void 0}),await new Promise(f=>{if(c.isConnected)f();else{const g=()=>{i.off(y.Connected,g),f()};i.on(y.Connected,g)}}),await d;const m=i.localParticipant.getTrackPublication(v.Source.Microphone)?.track;m&&c.setupInputAnalyser(m.mediaStreamTrack),i.name&&(c.conversationId=i.name.match(/(conv_[a-zA-Z0-9]+)/)?.[0]||i.name);const p=se(e);return c.debug({type:ie,message:p}),await c.sendRequiredMessage(p),c}catch(s){throw await i.disconnect(),s}}setupRoomEventListeners(){this.room.on(y.Connected,()=>{this.isConnected=!0}),this.room.on(y.Disconnected,e=>{this.isConnected=!1;const t={type:"close",reason:e?.toString()};this.disconnect($e.has(e)?{reason:"agent",context:t}:{reason:"error",message:`LiveKit room disconnected: ${k[e??k.UNKNOWN_REASON]}`,context:t})}),this.room.on(y.ConnectionStateChanged,e=>{e===te.Disconnected&&(this.isConnected=!1,this.disconnect({reason:"error",message:`LiveKit connection state changed to ${e}`,context:{type:"connection_state_changed"}}))}),this.room.on(y.DataReceived,(e,t)=>{try{const n=JSON.parse(new TextDecoder().decode(e));if(n.type==="audio"){O(n)&&this.handleMessage(n);return}O(n)?this.handleMessage(n):console.warn("Invalid socket event received:",n)}catch(n){console.warn("Failed to parse incoming data message:",n),console.warn("Raw payload:",new TextDecoder().decode(e))}}),this.room.on(y.TrackSubscribed,async(e,t,n)=>{const i=q(this.room,n);i&&e.kind===v.Kind.Video?this.setAvatarVideoTrack(e.mediaStreamTrack):i&&e.kind===v.Kind.Audio?(this.avatarAudioTrack=e,await this.playRemoteAudio(this.avatarAudioTrack)):e.kind===v.Kind.Audio&&n.identity.includes("agent")&&(this.agentAudioTrack=e,await this.playRemoteAudio(this.agentAudioTrack))}),this.room.on(y.TrackUnsubscribed,e=>{e.mediaStreamTrack===this.avatarVideoTrack&&this.setAvatarVideoTrack(null),e===this.agentAudioTrack&&(this.agentAudioTrack=null),e===this.avatarAudioTrack&&(this.avatarAudioTrack=null,this.voice="agent"),e===this.capturedTrack&&(this.capturedTrack=null),this.syncCapture()}),this.room.on(y.ActiveSpeakersChanged,async e=>{const t=e[0];if(t&&q(this.room,t))this.voice="avatar";else if(t?.identity.startsWith("agent"))this.voice="agent";else{this.updateMode("listening");return}this.updateMode("speaking"),await this.syncCapture()}),this.room.on(y.ParticipantDisconnected,e=>{q(this.room,e)?this.updateMode("listening"):e.identity?.startsWith("agent")&&queueMicrotask(()=>{const t=this.room.state;this.disconnect(t===te.Connected?{reason:"agent",context:{type:"close",reason:"agent disconnected"}}:{reason:"error",message:`LiveKit connection state changed to ${t}`,context:{type:"connection_state_changed"}})})})}async playRemoteAudio(e){this.audioAdapter&&(await this.audioAdapter.attachRemoteTrack(e,this.outputDeviceId),await this.syncCapture(),this.onDebug?.({type:"audio_element_ready"}))}async syncCapture(){const e=this.voice==="avatar"?this.avatarAudioTrack:this.agentAudioTrack;!e||e===this.capturedTrack||(this.capturedTrack=e,await this.setupAudioCapture(e))}setAvatarVideoTrack(e){e!==this.avatarVideoTrack&&(this.avatarVideoTrack=e,this.avatarVideoTrackListeners.forEach(t=>t(e)))}onAvatarVideoTrack(e){return this.avatarVideoTrackListeners.add(e),e(this.avatarVideoTrack),()=>{this.avatarVideoTrackListeners.delete(e)}}close(){if(this.isConnected){try{this.room.localParticipant.audioTrackPublications.forEach(e=>{e.track&&e.track.stop()})}catch(e){console.warn("Error stopping local tracks:",e)}this.audioAdapter?.cleanup(),this.inputAnalyser=void 0,this.outputAnalyser=void 0,this.inputVolumeProvider=L,this.outputVolumeProvider=L,this.agentAudioTrack=null,this.avatarAudioTrack=null,this.capturedTrack=null,this.setAvatarVideoTrack(null),this.room.disconnect()}}async sendMessage(e){if(!this.isConnected||!this.room.localParticipant){console.warn("Cannot send message: room not connected or no local participant");return}if(!("user_audio_chunk"in e)){this.handleOutgoingMessage(e);try{await this.publishMessage(e)}catch(t){this.debug({type:"send_message_error",message:{message:e,error:t}}),console.error("Failed to send message via WebRTC:",t)}}}async sendRequiredMessage(e){if(!this.isConnected||!this.room.localParticipant)throw new Error("Cannot send message: room not connected or no local participant");this.handleOutgoingMessage(e),await this.publishMessage(e)}async publishMessage(e){const n=new TextEncoder().encode(JSON.stringify(e));await this.room.localParticipant.publishData(n,{reliable:!0})}getRoom(){return this.room}setupInputAnalyser(e){if(this.audioAdapter)try{const t=this.audioAdapter.setupInputAnalysis(e);this.inputVolumeProvider=t.volumeProvider,this.inputAnalyser=t.analyser}catch(t){console.warn("[ConversationalAI] Failed to set up input volume analyser:",t)}}setInputVolumeProvider(e){this.inputVolumeProvider=e}setOutputVolumeProvider(e){this.outputVolumeProvider=e}async setupAudioCapture(e){if(this.audioAdapter)try{const t=(i,s)=>{if(s>Ve){const r=B(i),a=this.audioEventId++;this.handleMessage({type:"audio",audio_event:{audio_base_64:r,event_id:a}})}},n=await this.audioAdapter.setupOutputAnalysis(e,this.outputFormat,t,this.workletPaths);this.outputVolumeProvider=n.volumeProvider,this.outputAnalyser=n.analyser}catch(t){console.warn("Failed to set up audio capture:",t)}}setAudioVolume(e){this.audioAdapter?.setVolume(e)}async setAudioOutputDevice(e){if(!this.audioAdapter)throw new Error("Cannot set output device: no audio adapter available on this platform");await this.audioAdapter.setOutputDevice(e),this.outputDeviceId=e}async setAudioInputDevice(e){if(!this.isConnected||!this.room.localParticipant)throw new Error("Cannot change input device: room not connected or no local participant");const t=await this.createMicrophoneTrack(e);try{const n=this.room.localParticipant.getTrackPublication(v.Source.Microphone);n?.track&&await this.room.localParticipant.unpublishTrack(n.track),this._isMuted&&await t.mute(),await this.room.localParticipant.publishTrack(t,{name:"microphone",source:v.Source.Microphone})}catch(n){console.error("Failed to change input device:",n);const i=this.room.localParticipant.getTrackPublication(v.Source.Microphone);if(i?.track!==t&&t.stop(),!i?.track)try{await this.room.localParticipant.setMicrophoneEnabled(!this._isMuted);const s=this.room.localParticipant.getTrackPublication(v.Source.Microphone)?.track;s&&this.setupInputAnalyser(s.mediaStreamTrack)}catch(s){console.error("Failed to recover microphone after device switch error:",s)}throw n}this.setupInputAnalyser(t.mediaStreamTrack)}async enableMicrophone(e){if(!e){await this.room.localParticipant.setMicrophoneEnabled(!0);return}const t=await this.createMicrophoneTrack(e);try{await this.room.localParticipant.publishTrack(t,{name:"microphone",source:v.Source.Microphone})}catch(n){throw t.stop(),n}}createMicrophoneTrack(e){return Me({deviceId:{exact:e},echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,channelCount:{ideal:1}})}}const Be='Import the platform-specific entry point (e.g. @elevenlabs/client via the "browser" export).';let qe=Be;function ce(o){return new Error(`No ${o} registered. ${qe}`)}let H;function He(o){H=o}function je(){if(H)return H;throw ce("voice session setup strategy")}function Ge(o){if(!(o instanceof M))throw new Error(`setupWebRTCSession requires a WebRTCConnection. Received: ${o?.constructor?.name??typeof o}`);return{connection:o,input:o.input,output:o.output,playbackEventTarget:null,detach:async()=>{}}}const F=new Map;function ze(o,e){return e?`${o} ${e}`:o}async function Je({worklet:o,name:e,key:t,sourceCode:n,path:i}){const s=F.get(t);if(s)return o.addModule(s);if(i)try{await o.addModule(i),F.set(t,i);return}catch(c){throw new Error(`Failed to load the ${e} worklet module from path: ${i}. Error: ${c}`)}const r=new Blob([n],{type:"application/javascript"}),a=URL.createObjectURL(r);try{await o.addModule(a),F.set(t,a);return}catch{URL.revokeObjectURL(a)}try{const l=`data:application/javascript;base64,${btoa(n)}`;await o.addModule(l),F.set(t,l)}catch{throw new Error(`Failed to load the ${e} worklet module. Make sure the browser supports AudioWorklets. If you are using a strict CSP, you may need to self-host the worklet files.`)}}function j(o,e,t){const n=`${o}@${e}`;return async(i,s,r)=>{await Je({worklet:i.audioWorklet,name:o,key:ze(n,s),sourceCode:t,path:s});try{return new AudioWorkletNode(i,n,r)}catch(a){throw s?new Error(`The ${o} worklet loaded from ${s} does not match this version of @elevenlabs/client: it did not register the "${n}" processor. Serve the copy of @elevenlabs/client/worklets/${o}.js from the installed version of the package.`,{cause:a}):a}}}const Ye=j("audioConcatProcessor","e5742d9d56cdbf62",`/*
 * ulaw decoding logic taken from the wavefile library
 * https://github.com/rochars/wavefile/blob/master/lib/codecs/mulaw.js
 * USED BY @elevenlabs/client
 */

const decodeTable = [0, 132, 396, 924, 1980, 4092, 8316, 16764];

function decodeSample(muLawSample) {
  let sign;
  let exponent;
  let mantissa;
  let sample;
  muLawSample = ~muLawSample;
  sign = muLawSample & 0x80;
  exponent = (muLawSample >> 4) & 0x07;
  mantissa = muLawSample & 0x0f;
  sample = decodeTable[exponent] + (mantissa << (exponent + 3));
  if (sign !== 0) sample = -sample;

  return sample;
}

class AudioConcatProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.buffers = []; // Initialize an empty buffer
    this.cursor = 0;
    this.currentBuffer = null;
    this.wasInterrupted = false;
    this.finished = false;

    this.port.onmessage = ({ data }) => {
      switch (data.type) {
        case "setFormat":
          // A second resampler could finish last and replace the first with the wrong rate
          if (this.format !== undefined) {
            throw new Error("setFormat can only be sent once");
          }
          this.format = data.format;
          if (sampleRate !== data.sampleRate) {
            this.createResampler(data.sampleRate).then(
              () => this.port.postMessage({ type: "resampler_ready" }),
              error =>
                this.port.postMessage({
                  type: "resampler_error",
                  message:
                    error instanceof Error ? error.message : String(error),
                })
            );
          }
          break;
        case "buffer":
          this.wasInterrupted = false;
          this.buffers.push({
            samples:
              this.format === "ulaw"
                ? new Uint8Array(data.buffer)
                : new Int16Array(data.buffer),
            chunkId: data.chunkId,
          });
          break;
        case "interrupt":
          this.wasInterrupted = true;
          break;
        case "clearInterrupted":
          if (this.wasInterrupted) {
            this.wasInterrupted = false;
            this.buffers = [];
            this.currentBuffer = null;
          }
      }
    };
  }
  async createResampler(inputSampleRate) {
    if (!globalThis.LibSampleRate) {
      throw new Error("libsamplerate is not loaded");
    }
    this.resampler = await globalThis.LibSampleRate.create(
      1,
      inputSampleRate,
      sampleRate
    );
  }
  process(_, outputs) {
    let finished = false;
    const output = outputs[0][0];
    for (let i = 0; i < output.length; i++) {
      if (!this.currentBuffer) {
        if (this.buffers.length === 0) {
          finished = true;
          break;
        }
        const { samples, chunkId } = this.buffers.shift();
        this.currentBuffer = samples;
        if (chunkId !== undefined) {
          this.port.postMessage({ type: "chunk_start", chunkId });
        }
        if (this.resampler) {
          this.currentBuffer = this.resampler.full(this.currentBuffer);
        }
        this.cursor = 0;
      }

      let value = this.currentBuffer[this.cursor];
      if (this.format === "ulaw") {
        value = decodeSample(value);
      }
      output[i] = value / 32768;
      this.cursor++;

      if (this.cursor >= this.currentBuffer.length) {
        this.currentBuffer = null;
      }
    }

    if (this.finished !== finished) {
      this.finished = finished;
      this.port.postMessage({ type: "process", finished });
    }

    return true; // Continue processing
  }
}

registerProcessor("audioConcatProcessor@e5742d9d56cdbf62", AudioConcatProcessor);
`),Qe="https://cdn.jsdelivr.net/npm/@alexanderolsen/libsamplerate-js@2.1.2/dist/libsamplerate.worklet.js";async function le(o,e){const t=e||Qe;await o.audioWorklet.addModule(t)}function I(o){try{o.disconnect()}catch(e){if(!Ke(e))throw e}}function Ke(o){return typeof o=="object"&&o!==null&&"name"in o&&o.name==="InvalidAccessError"}function Xe(o){if(o.length===0)return 0;let e=0;for(let t=0;t<o.length;t++)e+=o[t]/255;return e/=o.length,e<0?0:e>1?1:e}function U(o,e){const t=o.frequencyBinCount;let n,i;return{getVolume(){return n??=new Uint8Array(t),i??=new Uint8Array(t),o.getByteFrequencyData(n),re(n,i,e),Xe(i)},getByteFrequencyData(s){n??=new Uint8Array(t),o.getByteFrequencyData(n),re(n,s,e)}}}function C(){return["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"ontouchend"in document}function Ze(){return/android/i.test(navigator.userAgent)}function ue(o){return new Promise((e,t)=>{const n=({data:i})=>{i.type==="resampler_ready"?(o.port.removeEventListener("message",n),e()):i.type==="resampler_error"&&(o.port.removeEventListener("message",n),t(new Error(`Failed to create audio resampler: ${i.message}`)))};o.port.addEventListener("message",n),o.port.start()})}function et({sampleRate:o,format:e,worklet:t,audioElement:n}){if(!C())return;const s=Math.floor(o*100/1e3),r=e==="ulaw"?new Uint8Array(s).fill(255):new Int16Array(s);t.port.postMessage({type:"buffer",buffer:r.buffer}),n.play().catch(()=>{})}function de(o){const{srcObject:e}=o;if(e instanceof MediaStream)for(const t of e.getTracks())t.stop();o.srcObject=null}class X{context;analyser;gain;worklet;audioElement;static async create({sampleRate:e,format:t,outputDeviceId:n,workletPaths:i,libsampleratePath:s,audioContext:r}){let a=r??null,c=null;try{if(!a)try{a=new AudioContext({sampleRate:e})}catch{a=new AudioContext({})}const l=a.createAnalyser(),d=a.createGain();c=new Audio,c.src="",c.load(),c.autoplay=!0,c.style.display="none",document.body.appendChild(c);const h=a.createMediaStreamDestination();c.srcObject=h.stream,d.connect(l),l.connect(h);const m=a.sampleRate!==e;m&&(console.warn(`[ConversationalAI] Sample rate ${e} not available, resampling to ${a.sampleRate}`),await le(a,s));const p=await Ye(a,i?.audioConcatProcessor),f=m?ue(p):Promise.resolve();return p.port.postMessage({type:"setFormat",format:t,sampleRate:e}),p.connect(d),await Promise.all([a.resume(),f]),et({sampleRate:e,format:t,worklet:p,audioElement:c}),n&&c.setSinkId&&await c.setSinkId(n),new X(a,l,d,p,c)}catch(l){throw c&&(de(c),c.parentNode&&c.parentNode.removeChild(c),c.pause()),a&&a.state!=="closed"&&await a.close(),l}}volume=1;interrupted=!1;listeners=new Set;chunkMetadata=new Map;nextChunkId=0;interruptTimeout=null;volumeProvider;constructor(e,t,n,i,s){this.context=e,this.analyser=t,this.gain=n,this.worklet=i,this.audioElement=s,this.worklet.port.addEventListener("message",this.handleWorkletMessage),this.worklet.port.start(),this.volumeProvider=U(t,e.sampleRate)}getAnalyser(){return this.analyser}getVolume(){return this.volumeProvider.getVolume()}getByteFrequencyData(e){this.volumeProvider.getByteFrequencyData(e)}addListener(e){this.listeners.add(e)}removeListener(e){this.listeners.delete(e)}handleWorkletMessage=e=>{let t=e;if(e.data.type==="chunk_start"){const{chunkId:n}=e.data,i=this.chunkMetadata.get(n);for(const s of this.chunkMetadata.keys()){if(s>n)break;this.chunkMetadata.delete(s)}if(!i)return;t=new MessageEvent("message",{data:{type:"chunk_start",...i}})}for(const n of this.listeners)n(t)};setVolume(e){this.volume=e,this.gain.gain.value=e}playAudio(e,t){this.gain.gain.cancelScheduledValues(this.context.currentTime),this.gain.gain.value=this.volume,this.interruptTimeout&&(clearTimeout(this.interruptTimeout),this.interruptTimeout=null),this.worklet.port.postMessage({type:"clearInterrupted"});let n;t&&(n=++this.nextChunkId,this.chunkMetadata.set(n,t)),this.worklet.port.postMessage({type:"buffer",buffer:e,chunkId:n})}interrupt(e=2e3){this.interrupted=!0,this.interruptTimeout&&(clearTimeout(this.interruptTimeout),this.interruptTimeout=null),this.worklet.port.postMessage({type:"interrupt"}),this.gain.gain.exponentialRampToValueAtTime(1e-4,this.context.currentTime+e/1e3),this.interruptTimeout=setTimeout(()=>{this.interrupted=!1,this.gain.gain.value=this.volume,this.worklet.port.postMessage({type:"clearInterrupted"}),this.interruptTimeout=null},e)}async setDevice(e){if(!("setSinkId"in HTMLAudioElement.prototype))throw new Error("setSinkId is not supported in this browser");const t=e?.outputDeviceId;await this.audioElement.setSinkId(t||"")}async close(){this.interruptTimeout&&(clearTimeout(this.interruptTimeout),this.interruptTimeout=null),this.worklet.port.removeEventListener("message",this.handleWorkletMessage),this.worklet.port.close(),I(this.worklet),de(this.audioElement),I(this.gain),I(this.analyser),this.listeners.clear(),this.chunkMetadata.clear(),this.audioElement.parentNode&&this.audioElement.parentNode.removeChild(this.audioElement),this.audioElement.pause(),await this.context.close()}}const he=j("rawAudioProcessor","934df7d37ace6c88",`/*
 * ulaw encoding logic taken from the wavefile library
 * https://github.com/rochars/wavefile/blob/master/lib/codecs/mulaw.js
 * USED BY @elevenlabs/client
 */

const BIAS = 0x84;
const CLIP = 32635;
const encodeTable = [
  0,0,1,1,2,2,2,2,3,3,3,3,3,3,3,3,
  4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
  5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,
  5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,
  6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
  6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
  6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
  6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
  7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
  7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
  7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
  7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
  7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
  7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
  7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
  7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7
];

function encodeSample(sample) {
  let sign;
  let exponent;
  let mantissa;
  let muLawSample;
  sign = (sample >> 8) & 0x80;
  if (sign !== 0) sample = -sample;
  sample = sample + BIAS;
  if (sample > CLIP) sample = CLIP;
  exponent = encodeTable[(sample>>7) & 0xFF];
  mantissa = (sample >> (exponent+3)) & 0x0F;
  muLawSample = ~(sign | (exponent << 4) | mantissa);
  
  return muLawSample;
}

class RawAudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
              
    this.port.onmessage = ({ data }) => {
      switch (data.type) {
        case "setFormat":
          // A second resampler could finish last and replace the first with the wrong rate
          if (this.format !== undefined) {
            throw new Error("setFormat can only be sent once");
          }
          this.isMuted = false;
          const chunkDurationMs = data.chunkDurationMs ?? 25;
          this.bufferSize = Math.max(
            1,
            Math.round((data.sampleRate * chunkDurationMs) / 1000)
          );
          this.format = data.format;

          if (sampleRate === data.sampleRate) {
            this.buffer = [];
          } else {
            this.createResampler(data.sampleRate).then(
              () => {
                this.buffer = [];
                this.port.postMessage({ type: "resampler_ready" });
              },
              error =>
                this.port.postMessage({
                  type: "resampler_error",
                  message:
                    error instanceof Error ? error.message : String(error),
                })
            );
          }
          break;
        case "setMuted":
          this.isMuted = data.isMuted;
          break;
      }
    };
  }
  async createResampler(outputSampleRate) {
    if (!globalThis.LibSampleRate) {
      throw new Error("libsamplerate is not loaded");
    }
    this.resampler = await globalThis.LibSampleRate.create(
      1,
      sampleRate,
      outputSampleRate
    );
  }
  process(inputs) {
    if (!this.buffer) {
      return true;
    }
    
    const input = inputs[0]; // Get the first input node
    if (input.length > 0) {
      let channelData = input[0]; // Get the first channel's data

      // Resample the audio if necessary
      if (this.resampler) {
        channelData = this.resampler.full(channelData);
      }

      // Add channel data to the buffer
      this.buffer.push(...channelData);
      // Get max volume 
      let sum = 0.0;
      for (let i = 0; i < channelData.length; i++) {
        sum += channelData[i] * channelData[i];
      }
      const maxVolume = Math.sqrt(sum / channelData.length);
      // Check if buffer size has reached or exceeded the threshold
      if (this.buffer.length >= this.bufferSize) {
        const float32Array = this.isMuted 
          ? new Float32Array(this.buffer.length)
          : new Float32Array(this.buffer);

        let encodedArray = this.format === "ulaw"
          ? new Uint8Array(float32Array.length)
          : new Int16Array(float32Array.length);

        // Iterate through the Float32Array and convert each sample to PCM16
        for (let i = 0; i < float32Array.length; i++) {
          // Clamp the value to the range [-1, 1]
          let sample = Math.max(-1, Math.min(1, float32Array[i]));

          // Scale the sample to the range [-32768, 32767]
          let value = sample < 0 ? sample * 32768 : sample * 32767;
          if (this.format === "ulaw") {
            value = encodeSample(Math.round(value));
          }

          encodedArray[i] = value;
        }

        // Send the buffered data to the main script
        this.port.postMessage([encodedArray, maxVolume]);

        // Clear the buffer after sending
        this.buffer = [];
      }
    }
    return true; // Continue processing
  }
}
registerProcessor("rawAudioProcessor@934df7d37ace6c88", RawAudioProcessor);
`),pe=25,me={echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,channelCount:{ideal:1}};class R{context;analyser;worklet;inputStream;mediaStreamSource;permissions;onError;static async create({sampleRate:e,format:t,preferHeadphonesForIosDevices:n,inputDeviceId:i,workletPaths:s,libsampleratePath:r,onError:a,inputChunkDurationMs:c=pe}){let l=null,d=null;try{const h={sampleRate:{ideal:e},...me};if(C()&&n){const Z=(await window.navigator.mediaDevices.enumerateDevices()).find(ee=>ee.kind==="audioinput"&&["airpod","headphone","earphone"].find(Ee=>ee.label.toLowerCase().includes(Ee)));Z&&(h.deviceId={ideal:Z.deviceId})}i&&(h.deviceId=R.getDeviceIdConstraint(i));const m=navigator.mediaDevices.getSupportedConstraints().sampleRate;l=new window.AudioContext(m?{sampleRate:e}:{});const p=l.createAnalyser();m||await le(l,r);const f=await he(l,s?.rawAudioProcessor),g={voiceIsolation:!0,...h};d=await navigator.mediaDevices.getUserMedia({audio:g});const _=l.createMediaStreamSource(d),w=l.sampleRate!==e?ue(f):Promise.resolve();f.port.postMessage({type:"setFormat",format:t,sampleRate:e,chunkDurationMs:c}),_.connect(p),p.connect(f),await Promise.all([l.resume(),w]);const Ae=await navigator.permissions.query({name:"microphone"});return new R(l,p,f,d,_,Ae,a)}catch(h){throw d?.getTracks().forEach(m=>{m.stop()}),l?.close(),h}}static getDeviceIdConstraint(e){if(e)return C()?{ideal:e}:{exact:e}}muted=!1;volumeProvider;constructor(e,t,n,i,s,r,a=console.error){this.context=e,this.analyser=t,this.worklet=n,this.inputStream=i,this.mediaStreamSource=s,this.permissions=r,this.onError=a,this.permissions.addEventListener("change",this.handlePermissionsChange),this.worklet.port.start(),this.volumeProvider=U(t,e.sampleRate)}getAnalyser(){return this.analyser}getVolume(){return this.muted?0:this.volumeProvider.getVolume()}getByteFrequencyData(e){if(this.muted){e.fill(0);return}this.volumeProvider.getByteFrequencyData(e)}isMuted(){return this.muted}addListener(e){this.worklet.port.addEventListener("message",e)}removeListener(e){this.worklet.port.removeEventListener("message",e)}forgetInputStreamAndSource(){for(const e of this.inputStream.getTracks())e.stop();this.mediaStreamSource.disconnect()}async close(){this.forgetInputStreamAndSource(),this.permissions.removeEventListener("change",this.handlePermissionsChange),I(this.worklet),I(this.analyser),this.worklet.port.close(),await this.context.close()}async setMuted(e){this.muted=e,this.worklet.port.postMessage({type:"setMuted",isMuted:e})}settingInput=!1;async setDevice(e){try{if(this.settingInput)throw new Error("Input device is already being set");this.settingInput=!0;const t=e?.inputDeviceId,n={...me};t&&(n.deviceId=R.getDeviceIdConstraint(t));const i={voiceIsolation:!0,...n},s=await navigator.mediaDevices.getUserMedia({audio:i});this.forgetInputStreamAndSource(),this.inputStream=s,this.mediaStreamSource=this.context.createMediaStreamSource(s),this.mediaStreamSource.connect(this.analyser)}catch(t){throw this.onError("Failed to switch input device:",t),t}finally{this.settingInput=!1}}handlePermissionsChange=()=>{if(this.permissions.state==="denied")this.onError("Microphone permission denied");else if(!this.settingInput){const[e]=this.inputStream.getAudioTracks(),{deviceId:t}=e?.getSettings()??{};this.setDevice({inputDeviceId:t}).catch(n=>{this.onError("Failed to reset input device after permission change:",n)})}}}const tt="enclave_setup_config";function fe(o){return{url:o.url,...o.hmacSecret!==void 0?{hmac_secret:o.hmacSecret}:{}}}function nt(o){const e={type:tt,agent_config_dict:o.agentConfig??null,override_agent_config_list:o.agentConfigOverrides??null,tools_config_list:o.tools??null,prompt_knowledge_base:o.promptKnowledgeBase??null};return o.bedrockInferenceProfile!==void 0&&(e.bedrock_inference_profile=o.bedrockInferenceProfile),o.postCallTranscriptionWebhook&&(e.post_call_transcription_webhook=fe(o.postCallTranscriptionWebhook)),o.postCallAudioWebhook&&(e.post_call_audio_webhook=fe(o.postCallAudioWebhook)),e}const ot="convai",it="wss://api.elevenlabs.io",st="/v1/convai/conversation?agent_id=";class P extends ne{socket;conversationId;inputFormat;outputFormat;outputListeners=new Set;pendingAudioEvents=[];constructor(e,t,n,i){super(),this.socket=e,this.conversationId=t,this.inputFormat=n,this.outputFormat=i,this.socket.addEventListener("error",s=>{setTimeout(()=>this.disconnect({reason:"error",message:"The connection was closed due to a socket error.",context:{type:s.type}}),0)}),this.socket.addEventListener("close",s=>{const r=s.code,a=s.reason||void 0,c={type:s.type,code:r,reason:a};this.disconnect(r===1e3?{reason:"agent",context:c,closeCode:r,closeReason:a}:{reason:"error",message:a||"The connection was closed by the server.",context:c,closeCode:r,closeReason:a})}),this.socket.addEventListener("message",s=>{try{const r=JSON.parse(s.data);if(!O(r)){this.debug({type:"invalid_event",message:"Received invalid socket event",data:s.data});return}this.handleMessage(r)}catch(r){this.debug({type:"parsing_error",message:"Failed to parse socket message",error:r instanceof Error?r.message:String(r),data:s.data})}})}static async create(e){let t=null;try{let n,i;const{name:s,version:r}=x;if(e.orchestrator)n=e.orchestrator.url;else{const f=e.origin??it;if(e.signedUrl){const g=e.signedUrl.includes("?")?"&":"?";n=`${e.signedUrl}${g}source=${s}&version=${r}`}else n=`${f}${st}${e.agentId}&source=${s}&version=${r}`;if(e.environment&&(n+=`&environment=${encodeURIComponent(e.environment)}`),e.persistentSession){n+="&is_persistent=true&replay_history=true";const g=typeof e.persistentSession=="object"?e.persistentSession.token:void 0;g&&(n+=`&persistent_session_token=${encodeURIComponent(g)}`)}i=[ot],e.authorization&&i.push(`bearer.${e.authorization}`)}t=new WebSocket(n,i);const a=await new Promise((f,g)=>{t.addEventListener("open",()=>{e.orchestrator&&t?.send(JSON.stringify(nt(e.orchestrator)));const _=se(e);t?.send(JSON.stringify(_))},{once:!0}),t.addEventListener("error",_=>{setTimeout(()=>g(new W("The connection was closed due to a socket error.")),0)}),t.addEventListener("close",_=>{const w=_.reason||(_.code===1e3?"Connection closed normally before session could be established.":"Connection closed unexpectedly before session could be established.");g(new W(w,{closeCode:_.code,closeReason:_.reason||void 0}))}),t.addEventListener("message",_=>{const w=JSON.parse(_.data);O(w)&&(w.type==="conversation_initiation_metadata"?f(w.conversation_initiation_metadata_event):console.warn("First received message is not conversation metadata."))},{once:!0})}),{conversation_id:c,agent_output_audio_format:l,user_input_audio_format:d}=a,h=D(d??"pcm_16000"),m=D(l),p=new P(t,c,h,m);return p.handleMessage({type:"conversation_initiation_metadata",conversation_initiation_metadata_event:a}),p}catch(n){throw t?.close(),n}}close(){this.pendingAudioEvents=[],this.socket.close(1e3,"User ended conversation")}sendMessage(e){this.handleOutgoingMessage(e),this.socket.send(JSON.stringify(e))}addListener(e){const t=this.outputListeners.size>0;if(this.outputListeners.add(e),t||this.pendingAudioEvents.length===0)return;const n=this.pendingAudioEvents;this.pendingAudioEvents=[];for(const i of n)e(i)}removeListener(e){this.outputListeners.delete(e)}handleMessage(e){if(super.handleMessage(e),e.type==="audio"&&e.audio_event.audio_base_64){const{audio_base_64:t,event_id:n,alignment:i}=e.audio_event,s=i?{audio_base_64:t,metadata:{event_id:n,alignment:i}}:{audio_base_64:t};if(this.outputListeners.size===0){this.pendingAudioEvents.push(s);return}this.outputListeners.forEach(r=>r(s))}}}function rt(o,e){const t=n=>{const i=n.data[0];e.sendMessage({user_audio_chunk:B(i.buffer)})};return o.addListener(t),()=>{o.removeListener(t)}}function at(o,e){const t=n=>{e.playAudio(De(n.audio_base_64),n.metadata)};return o.addListener(t),()=>{o.removeListener(t)}}function ct(o){const e="signedUrl"in o&&o.signedUrl,t="orchestrator"in o&&o.orchestrator;if(e&&o.connectionType==="webrtc")throw new Error("signedUrl only supports websocket connections. Remove connectionType or set it to 'websocket'.");if(t&&o.connectionType==="webrtc")throw new Error("Orchestrator sessions only support websocket connections. Remove connectionType or set it to 'websocket'.");if(t&&(e||"conversationToken"in o&&o.conversationToken||o.authorization))throw new Error("The orchestrator option cannot be combined with signedUrl, conversationToken or authorization.");return o.connectionType?o.connectionType:"conversationToken"in o&&o.conversationToken?"webrtc":e||t||o.textOnly?"websocket":"webrtc"}async function G(o){const e=ct(o);switch(e){case"websocket":return P.create(o);case"webrtc":return M.create(o);default:throw new Error(`Unknown connection type: ${e}`)}}const lt={default:0,android:3e3};function ge(o,e="default"){const t=o??lt;return e==="android"?t.android??t.default:e==="ios"?t.ios??t.default:t.default}async function _e(o){o>0&&await new Promise(e=>setTimeout(e,o))}const ut=3e4,dt=["touchstart","touchend","click"];let S=null,b=null,ve=!1;function ht(o){const e=o.createBuffer(1,1,22050),t=o.createBufferSource();t.buffer=e,t.connect(o.destination),t.start(0),o.resume().catch(()=>{})}function pt(){b&&clearTimeout(b),b=setTimeout(()=>{b=null,z()},ut)}function ye(){b&&(clearTimeout(b),b=null)}function mt(){if(!C()||S)return;const o=new AudioContext;ht(o),S=o,pt()}function ft(){if(!C()||ve||typeof document>"u")return;ve=!0;const o=()=>{mt()};for(const e of dt)document.addEventListener(e,o,!0)}function gt(){const o=S;return S=null,ye(),o}function z(){S&&(S.close().catch(()=>{}),S=null,ye())}function _t(){return Ze()?"android":C()?"ios":"default"}async function we(){if("wakeLock"in navigator)try{return await navigator.wakeLock.request("screen")}catch{}return null}async function vt(o,e,t){const n=R.create({...e.inputFormat,preferHeadphonesForIosDevices:o.preferHeadphonesForIosDevices,inputDeviceId:o.inputDeviceId,inputChunkDurationMs:o.inputChunkDurationMs,workletPaths:o.workletPaths,libsampleratePath:o.libsampleratePath}),i=X.create({...e.outputFormat,outputDeviceId:o.outputDeviceId,workletPaths:o.workletPaths,libsampleratePath:o.libsampleratePath,audioContext:t??void 0});let s,r;try{[s,r]=await Promise.all([n,i])}catch(l){throw await Promise.allSettled([n,i].map(d=>d.then(h=>h.close()))),l}const a=rt(s,e),c=at(e,r);return{input:s,output:r,playbackEventTarget:r,detach:async()=>{a(),c()}}}async function yt(o){const e=o.useWakeLock??!0;let t=null,n=null,i=null;try{e&&(t=await we()),n=await navigator.mediaDevices.getUserMedia({audio:!0});const s=_t();await _e(ge(o.connectionDelay,s));const r=await G(o);let a;try{r instanceof P?(i=gt(),a={connection:r,...await vt(o,r,i)},i=null):(z(),a=Ge(r))}catch(d){throw await i?.close().catch(()=>{}),i=null,r.close(),d}if(n){for(const d of n.getTracks())d.stop();n=null}let c=null;t&&(c=()=>{document.visibilityState==="visible"&&t?.released&&we().then(d=>{t=d})},document.addEventListener("visibilitychange",c));const l=a.detach;return{...a,detach:async()=>{await l(),c&&document.removeEventListener("visibilitychange",c);try{await t?.release(),t=null}catch{}}}}catch(s){if(n)for(const r of n.getTracks())r.stop();try{await t?.release(),t=null}catch{}throw z(),s}}He(yt);class wt{audioElements=[];volume=1;inputAudioContext=null;audioCaptureContext=null;async attachRemoteTrack(e,t){const n=e.attach();if(n.autoplay=!0,n.controls=!1,n.volume=this.volume,t&&n.setSinkId)try{await n.setSinkId(t)}catch(i){console.warn("Failed to set output device for new audio element:",i)}n.style.display="none",document.body.appendChild(n),this.audioElements.push(n)}setupInputAnalysis(e){this.inputAudioContext&&(this.inputAudioContext.close().catch(()=>{}),this.inputAudioContext=null);const t=new AudioContext,n=t.createAnalyser();return t.createMediaStreamSource(new MediaStream([e])).connect(n),this.inputAudioContext=t,{volumeProvider:U(n,t.sampleRate),analyser:n}}async setupOutputAnalysis(e,t,n,i){this.audioCaptureContext&&(this.audioCaptureContext.close().catch(()=>{}),this.audioCaptureContext=null);const s=new AudioContext;this.audioCaptureContext=s;const r=s.createAnalyser();r.fftSize=2048,r.smoothingTimeConstant=.8;const a=new MediaStream([e.mediaStreamTrack]),c=s.createMediaStreamSource(a),l=U(r,s.sampleRate),d=await he(s,i?.rawAudioProcessor);return d.port.postMessage({type:"setFormat",format:t.format,sampleRate:t.sampleRate}),d.port.onmessage=h=>{const[m,p]=h.data;n(m.buffer,p)},c.connect(r),r.connect(d),{volumeProvider:l,analyser:r}}setVolume(e){this.volume=e;for(const t of this.audioElements)t.volume=e}async setOutputDevice(e){if(!("setSinkId"in HTMLAudioElement.prototype))throw new Error("setSinkId is not supported in this browser");await Promise.all(this.audioElements.map(async t=>{try{await t.setSinkId(e)}catch(n){throw console.error("Failed to set sink ID for audio element:",n),n}}))}cleanup(){this.inputAudioContext&&(this.inputAudioContext.close().catch(e=>{console.warn("Error closing input audio context:",e)}),this.inputAudioContext=null),this.audioCaptureContext&&(this.audioCaptureContext.close().catch(e=>{console.warn("Error closing audio capture context:",e)}),this.audioCaptureContext=null);for(const e of this.audioElements)e.remove();this.audioElements=[]}}let J=null;function St(o){J=o}function bt(){if(!J)throw ce("Scribe microphone implementation");return J}const kt=j("scribeAudioProcessor","bd293b92cef79b80",`/*
 * Scribe Audio Processor for converting microphone audio to PCM16 format
 * Supports resampling for browsers like Firefox that don't support
 * AudioContext sample rate constraints.
 * USED BY @elevenlabs/client
 */

class ScribeAudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.buffer = [];
    this.bufferSize = 4096; // Buffer size for optimal chunk transmission

    // Resampling state
    this.inputSampleRate = null;
    this.outputSampleRate = null;
    this.resampleRatio = 1;
    this.lastSample = 0;
    this.resampleAccumulator = 0;

    this.port.onmessage = ({ data }) => {
      if (data.type === "configure") {
        this.inputSampleRate = data.inputSampleRate;
        this.outputSampleRate = data.outputSampleRate;
        if (this.inputSampleRate && this.outputSampleRate) {
          this.resampleRatio = this.inputSampleRate / this.outputSampleRate;
        }
      }
    };
  }

  // Linear interpolation resampling
  resample(inputData) {
    if (this.resampleRatio === 1 || !this.inputSampleRate) {
      return inputData;
    }

    const outputSamples = [];

    for (let i = 0; i < inputData.length; i++) {
      const currentSample = inputData[i];

      // Generate output samples using linear interpolation
      while (this.resampleAccumulator < 1) {
        const interpolated =
          this.lastSample +
          (currentSample - this.lastSample) * this.resampleAccumulator;
        outputSamples.push(interpolated);
        this.resampleAccumulator += this.resampleRatio;
      }

      this.resampleAccumulator -= 1;
      this.lastSample = currentSample;
    }

    return new Float32Array(outputSamples);
  }

  process(inputs) {
    const input = inputs[0];
    if (input.length > 0) {
      let channelData = input[0]; // Get first channel (mono)

      // Resample if needed (for Firefox and other browsers that don't
      // support AudioContext sample rate constraints)
      if (this.resampleRatio !== 1) {
        channelData = this.resample(channelData);
      }

      // Add incoming audio to buffer
      for (let i = 0; i < channelData.length; i++) {
        this.buffer.push(channelData[i]);
      }

      // When buffer reaches threshold, convert and send
      if (this.buffer.length >= this.bufferSize) {
        const float32Array = new Float32Array(this.buffer);
        const int16Array = new Int16Array(float32Array.length);

        // Convert Float32 [-1, 1] to Int16 [-32768, 32767]
        for (let i = 0; i < float32Array.length; i++) {
          // Clamp the value to prevent overflow
          const sample = Math.max(-1, Math.min(1, float32Array[i]));
          // Scale to PCM16 range
          int16Array[i] = sample < 0 ? sample * 32768 : sample * 32767;
        }

        // Send to main thread as transferable ArrayBuffer
        this.port.postMessage(
          {
            audioData: int16Array.buffer
          },
          [int16Array.buffer]
        );

        // Clear buffer
        this.buffer = [];
      }
    }

    return true; // Continue processing
  }
}

registerProcessor("scribeAudioProcessor@bd293b92cef79b80", ScribeAudioProcessor);

`),Y=16e3,Tt=async(o,e)=>{let t,n,i,s;const r=()=>{for(const a of t?.getTracks()??[])a.stop();i?.disconnect(),s?.disconnect(),n?.close()};try{t=await navigator.mediaDevices.getUserMedia({audio:{deviceId:o.deviceId,echoCancellation:o.echoCancellation??!0,noiseSuppression:o.noiseSuppression??!0,autoGainControl:o.autoGainControl??!0,channelCount:o.channelCount??1,sampleRate:{ideal:Y}}});const[a]=t.getAudioTracks(),c=a?.getSettings().sampleRate;return n=new AudioContext(c?{sampleRate:c}:{}),s=await kt(n,o.workletPaths?.scribeAudioProcessor),i=n.createMediaStreamSource(t),n.sampleRate!==Y&&s.port.postMessage({type:"configure",inputSampleRate:n.sampleRate,outputSampleRate:Y}),s.port.onmessage=l=>{e(B(l.data.audioData))},i.connect(s),n.state==="suspended"&&await n.resume(),{mediaStreamTrack:a,cleanup:r}}catch(a){throw r(),a}},Ct="https://api.elevenlabs.io";async function At({conversationId:o,origin:e,file:t,filename:n}){const i=(e??Ct).replace(/^wss:\/\//,"https://").replace(/^ws:\/\//,"http://"),s=n??("name"in t&&typeof t.name=="string"?t.name:`upload.${(t.type||"image/png").split("/").pop()?.split("+")[0]}`),r=new FormData;r.append("file",t,s);const a=await fetch(`${i}/v1/convai/conversations/${o}/files`,{method:"POST",body:r});if(!a.ok){const d=await oe(a);throw new Error(`Upload failed: ${a.status} ${d}`)}const c=await a.json();Re(c,"Upload response is not a JSON object");const{file_id:l}=c;if(typeof l!="string"||!l)throw new Error("Upload response is missing a valid file_id");return{fileId:l}}function Et(o,e,t={}){const n=t.leading??!0,i=t.trailing??!1;let s,r;const a=()=>{s!==void 0&&(clearTimeout(s),s=void 0)},c=()=>{s=setTimeout(()=>{if(s=void 0,r===void 0)return;const d=r;r=void 0,c(),o(...d)},e)},l=(...d)=>{if(s!==void 0){i&&(r=d);return}c(),n?o(...d):i&&(r=d)};return l.cancel=()=>{a(),r=void 0},l}const Se=String.raw`\[[\p{L}\p{M}\p{N}_\s]+\](?!\()`,It=new RegExp(Se,"gu"),Mt=new RegExp(String.raw`([\p{Zs}\t]*(?:${Se}[\p{Zs}\t]*)+)`,"u"),Rt=/(?:^|\s)$/u,Pt=/^(?:\s|$)/u,Dt=/[\p{Ps}\p{Pi}]$/u,xt=/^[\p{Terminal_Punctuation}\p{Pe}\p{Pf}]/u;function Ot(o,e,t){return Rt.test(o)||Pt.test(t)||e.replace(It,"")===""||e.startsWith("[")&&Dt.test(o)||e.endsWith("]")&&xt.test(t)?"":" "}function N(o){const e=o.split(Mt);let t=e[0];for(let n=1;n<e.length;n+=2)t+=Ot(e[n-1],e[n],e[n+1])+e[n+1];return t.trim()}const be={reason:"agent",context:{type:"end_call",reason:"Agent ended the call"}},Lt=1e3;function ke(o){const{textOnly:e}=o.overrides?.conversation??{},{textOnly:t}=o;return typeof t=="boolean"?(typeof e=="boolean"&&t!==e&&console.warn(`Conflicting textOnly options provided: ${t} via options.textOnly (will be used) and ${e} via options.overrides.conversation.textOnly (will be ignored)`),t):typeof e=="boolean"?e:void 0}class V{options;connection;lastInterruptTimestamp=0;mode="listening";status="connecting";volume=1;currentEventId=1;canSendFeedback=!1;mcpApprovals=new Map;throttledUserActivity=Et(()=>{this.connection.sendMessage({type:"user_activity"})},Lt);static getFullOptions(e){const t=ke(e);return{clientTools:{},onConnect:()=>{},onDebug:()=>{},onDisconnect:()=>{},onError:()=>{},onMessage:()=>{},onAudio:()=>{},onModeChange:()=>{},onStatusChange:()=>{},onCanSendFeedbackChange:()=>{},onInterruption:()=>{},onAgentResponseCorrection:()=>{},onAgentTyping:()=>{},onExternalAgentConnected:()=>{},onExternalAgentDisconnected:()=>{},onPing:()=>{},...e,textOnly:t,overrides:{...e.overrides,conversation:{...e.overrides?.conversation,textOnly:t}}}}constructor(e,t){this.options=e,this.connection=t,this.connection.onMessage(this.onMessage),this.connection.onDisconnect(this.endSessionWithDetails),this.connection.onModeChange(n=>this.updateMode(n)),this.connection.onOutgoingMessage(this.onOutgoingMessage)}markConnected(){this.updateStatus("connected")}endSession(){return this.endSessionWithDetails({reason:"user"})}endSessionWithDetails=async e=>{if(!(this.status!=="connected"&&this.status!=="connecting")){this.updateStatus("disconnecting");for(const t of this.mcpApprovals.keys())this.markMCPApprovalStale(t);try{await this.handleEndSession()}finally{this.updateStatus("disconnected"),this.options.onDisconnect&&this.options.onDisconnect(e)}}};async handleEndSession(){this.throttledUserActivity.cancel(),this.connection.close()}updateMode(e){e!==this.mode&&(this.mode=e,this.options.onModeChange&&this.options.onModeChange({mode:e}))}updateStatus(e){e!==this.status&&(this.status=e,this.options.onStatusChange&&this.options.onStatusChange({status:e}),this.updateCanSendFeedback())}updateCanSendFeedback(){const e=this.status==="connected";this.canSendFeedback!==e&&(this.canSendFeedback=e,this.options.onCanSendFeedbackChange&&this.options.onCanSendFeedbackChange({canSendFeedback:e}))}handleInterruption(e){e.interruption_event&&(this.lastInterruptTimestamp=e.interruption_event.event_id,this.options.onInterruption&&this.options.onInterruption({event_id:e.interruption_event.event_id}))}handleAgentResponse(e){this.currentEventId=e.agent_response_event.event_id,this.options.onMessage&&this.options.onMessage({source:"ai",role:"agent",message:this.options.stripAudioTags?N(e.agent_response_event.agent_response):e.agent_response_event.agent_response,event_id:e.agent_response_event.event_id,...e.agent_response_event.response_id?{response_id:e.agent_response_event.response_id}:{},attachments:e.agent_response_event.attachments})}handleAgentResponseCorrection(e){if(this.options.onAgentResponseCorrection){const t=e.agent_response_correction_event;this.options.onAgentResponseCorrection(this.options.stripAudioTags?{...t,original_agent_response:N(t.original_agent_response),corrected_agent_response:N(t.corrected_agent_response)}:t)}}handleUserTranscript(e){this.options.onMessage&&this.options.onMessage({source:"user",role:"user",message:e.user_transcription_event.user_transcript,event_id:e.user_transcription_event.event_id})}handleTentativeAgentResponse(e){this.options.onDebug&&this.options.onDebug({type:"tentative_agent_response",response:e.tentative_agent_response_internal_event.tentative_agent_response})}handleVadScore(e){this.options.onVadScore&&this.options.onVadScore({vadScore:e.vad_score_event.vad_score})}handlePing(e){this.options.onPing&&this.options.onPing(e.ping_event)}handleContextUsage(e){this.options.onContextUsage&&this.options.onContextUsage(e.context_usage_event)}async handleClientToolCall(e){if(Object.prototype.hasOwnProperty.call(this.options.clientTools,e.client_tool_call.tool_name))try{const t=await this.options.clientTools[e.client_tool_call.tool_name](e.client_tool_call.parameters)??"Client tool execution successful.",n=typeof t=="object"?JSON.stringify(t):String(t);this.connection.sendMessage({type:"client_tool_result",tool_call_id:e.client_tool_call.tool_call_id,result:n,is_error:!1})}catch(t){this.onError(`Client tool execution failed with following error: ${t?.message}`,{clientToolName:e.client_tool_call.tool_name}),this.connection.sendMessage({type:"client_tool_result",tool_call_id:e.client_tool_call.tool_call_id,result:`Client tool execution failed: ${t?.message}`,is_error:!0})}else{if(this.options.onUnhandledClientToolCall){this.options.onUnhandledClientToolCall(e.client_tool_call);return}this.onError(`Client tool with name ${e.client_tool_call.tool_name} is not defined on client`,{clientToolName:e.client_tool_call.tool_name}),this.connection.sendMessage({type:"client_tool_result",tool_call_id:e.client_tool_call.tool_call_id,result:`Client tool with name ${e.client_tool_call.tool_name} is not defined on client`,is_error:!0})}}handleAudio(e){}async handleMCPToolCall(e){const t=e.mcp_tool_call;if(this.options.onMCPToolCall&&this.options.onMCPToolCall(t),t.state!=="awaiting_approval"){this.markMCPApprovalStale(t.tool_call_id);return}const n=this.options.onMCPToolApprovalRequest;if(!n)return;if(this.status==="disconnecting"||this.status==="disconnected"){this.onError(`Ignored an approval request for MCP tool call ${t.tool_call_id}, which arrived after the session ended`,this.mcpApprovalErrorContext(t));return}if(this.mcpApprovals.has(t.tool_call_id)){this.onError(`Ignored a repeated approval request for MCP tool call ${t.tool_call_id}, which has already been handled`,this.mcpApprovalErrorContext(t));return}const i={state:"pending",controller:new AbortController};this.mcpApprovals.set(t.tool_call_id,i);let s;try{s=await n(t,{signal:i.controller.signal})}catch(r){this.onError(`MCP tool approval handler failed: ${r?.message}`,this.mcpApprovalErrorContext(t)),this.settleMCPApproval(t,!1);return}if(typeof s!="boolean"){this.onError(`MCP tool approval handler must resolve to a boolean, received ${typeof s}`,this.mcpApprovalErrorContext(t)),this.settleMCPApproval(t,!1);return}this.settleMCPApproval(t,s)}settleMCPApproval(e,t){const n=this.mcpApprovals.get(e.tool_call_id);if(!n||n.state!=="pending"){this.onError(`Discarded an approval decision for MCP tool call ${e.tool_call_id}, which is no longer awaiting approval`,this.mcpApprovalErrorContext(e));return}n.state="settled",this.sendMCPToolApprovalResult(e.tool_call_id,t)}markMCPApprovalStale(e){const t=this.mcpApprovals.get(e);!t||t.state!=="pending"||(t.state="stale",t.controller.abort())}mcpApprovalErrorContext(e){return{toolCallId:e.tool_call_id,toolName:e.tool_name,serviceId:e.service_id}}handleMCPConnectionStatus(e){this.options.onMCPConnectionStatus&&this.options.onMCPConnectionStatus(e.mcp_connection_status)}handleAgentToolRequest(e){this.options.onAgentToolRequest&&this.options.onAgentToolRequest(e.agent_tool_request)}handleAgentToolResponse(e){e.agent_tool_response.tool_name==="end_call"&&this.endSessionWithDetails(be).catch(t=>{this.onError("Failed to end session after agent end_call",t)}),this.options.onAgentToolResponse?.(e.agent_tool_response)}handleAgentToolResponseFullPayload(e){e.agent_tool_response_full_payload.tool_name==="end_call"&&this.endSessionWithDetails(be).catch(t=>{this.onError("Failed to end session after agent end_call",t)}),this.options.onAgentToolResponse?.(e.agent_tool_response_full_payload)}handleConversationMetadata(e){this.options.onConversationMetadata&&this.options.onConversationMetadata(e.conversation_initiation_metadata_event)}handleConversationHistory(e){this.options.onConversationHistory&&this.options.onConversationHistory(e.conversation_history_event)}handleAsrInitiationMetadata(e){this.options.onAsrInitiationMetadata&&this.options.onAsrInitiationMetadata(e.asr_initiation_metadata_event)}handleAgentChatResponsePart(e){this.options.onAgentChatResponsePart&&this.options.onAgentChatResponsePart(e.text_response_part)}handleAgentReasoningResponsePart(e){this.options.onAgentReasoningResponsePart&&this.options.onAgentReasoningResponsePart(e.reasoning_response_part)}handleRichContent(e){this.options.onRichContent&&this.options.onRichContent(e.rich_content)}handleGuardrailTriggered(e){this.options.onGuardrailTriggered&&this.options.onGuardrailTriggered()}handleAgentTyping(e){this.options.onAgentTyping&&this.options.onAgentTyping(e.agent_typing_event)}handleExternalAgentConnected(e){this.options.onExternalAgentConnected&&this.options.onExternalAgentConnected()}handleExternalAgentDisconnected(e){this.options.onExternalAgentDisconnected&&this.options.onExternalAgentDisconnected()}handleErrorEvent(e){const t=e.error_event,n=t?.error_type,i=t?.message||t?.reason||"Unknown error";if(n==="max_duration_exceeded"){this.endSessionWithDetails({reason:"error",message:i,context:{type:"max_duration_exceeded"}}).catch(s=>{this.onError("Failed to end session after max_duration_exceeded",s)});return}this.onError(`Server error: ${i}`,{errorType:n,code:t?.code,debugMessage:t?.debug_message,details:t?.details})}onMessage=async e=>{switch(this.options.onIncomingEvent?.(e),e.type){case"interruption":{this.handleInterruption(e);return}case"agent_response":{this.handleAgentResponse(e);return}case"agent_response_correction":{this.handleAgentResponseCorrection(e);return}case"user_transcript":{this.handleUserTranscript(e);return}case"internal_tentative_agent_response":{this.handleTentativeAgentResponse(e);return}case"client_tool_call":{try{await this.handleClientToolCall(e)}catch(t){this.onError(`Unexpected error in client tool call handling: ${t instanceof Error?t.message:String(t)}`,{clientToolName:e.client_tool_call.tool_name,toolCallId:e.client_tool_call.tool_call_id})}return}case"audio":{this.handleAudio(e);return}case"vad_score":{this.handleVadScore(e);return}case"ping":{this.connection.sendMessage({type:"pong",event_id:e.ping_event.event_id}),this.handlePing(e);return}case"context_usage":{this.handleContextUsage(e);return}case"mcp_tool_call":{try{await this.handleMCPToolCall(e)}catch(t){this.onError(`Unexpected error in MCP tool call handling: ${t instanceof Error?t.message:String(t)}`,{toolCallId:e.mcp_tool_call.tool_call_id,toolName:e.mcp_tool_call.tool_name})}return}case"mcp_connection_status":{this.handleMCPConnectionStatus(e);return}case"agent_tool_request":{this.handleAgentToolRequest(e);return}case"agent_tool_response":{this.handleAgentToolResponse(e);return}case"agent_tool_response_full_payload":{this.handleAgentToolResponseFullPayload(e);return}case"conversation_initiation_metadata":{this.handleConversationMetadata(e);return}case"conversation_history":{this.handleConversationHistory(e);return}case"asr_initiation_metadata":{this.handleAsrInitiationMetadata(e);return}case"agent_chat_response_part":{this.handleAgentChatResponsePart(e);return}case"agent_reasoning_response_part":{this.handleAgentReasoningResponsePart(e);return}case"rich_content":{this.handleRichContent(e);return}case"guardrail_triggered":{this.handleGuardrailTriggered(e);return}case"error":{this.handleErrorEvent(e);return}case"agent_typing":{this.handleAgentTyping(e);return}case"external_agent_connected":{this.handleExternalAgentConnected(e);return}case"external_agent_disconnected":{this.handleExternalAgentDisconnected(e);return}default:{this.options.onDebug&&this.options.onDebug(e);return}}};onError(e,t){console.error(e,t),this.options.onError&&this.options.onError(e,t)}onOutgoingMessage=e=>{this.options.onOutgoingEvent?.(e)};getId(){return this.connection.conversationId}isOpen(){return this.status==="connected"}sendFeedback(e,t){if(!this.canSendFeedback){console.warn("Cannot send feedback: the conversation is not connected.");return}this.connection.sendMessage({type:"feedback",score:e!==null?e?"like":"dislike":null,event_id:t??this.currentEventId})}sendContextualUpdate(e,t){this.connection.sendMessage({type:"contextual_update",text:e,...t?.contextId?{context_id:t.contextId}:{}})}sendUserMessage(e,t){this.connection.sendMessage({type:"user_message",text:e,rich_content_id:t?.richContentId??void 0})}sendUserActivity(){this.throttledUserActivity()}sendMCPToolApprovalResult(e,t){this.connection.sendMessage({type:"mcp_tool_approval_result",tool_call_id:e,is_approved:t})}sendMultimodalMessage(e){const n=(e.fileIds?.length?e.fileIds:e.fileId?[e.fileId]:[]).map(i=>({type:"file_input",file_id:i}));this.connection.sendMessage({type:"multimodal_message",text:e.text?{type:"user_message",text:e.text}:void 0,file:n[0],files:n.length?n:void 0})}async uploadFile(e){if(this.options.orchestrator)throw new Error("uploadFile is not supported for self-hosted orchestrator sessions.");return At({conversationId:this.connection.conversationId,origin:this.options.origin,file:e})}}function Ft(){const o=["fetch","WebSocket","TextEncoder","TextDecoder","URL","btoa","atob"];for(const e of o)if(typeof globalThis[e]>"u")throw new Error(`${e} is not available in this environment.`)}const Te=new Uint8Array(0);class $ extends V{type="text";setVolume(){throw new Error("setVolume is not supported in text conversations")}setMicMuted(){throw new Error("setMicMuted is not supported in text conversations")}getInputByteFrequencyData(){return Te}getOutputByteFrequencyData(){return Te}getInputVolume(){return 0}getOutputVolume(){return 0}static async startSession(e){const t=V.getFullOptions(e);t.onStatusChange&&t.onStatusChange({status:"connecting"}),t.onCanSendFeedbackChange&&t.onCanSendFeedbackChange({canSendFeedback:!1}),t.onModeChange&&t.onModeChange({mode:"listening"}),t.onCanSendFeedbackChange&&t.onCanSendFeedbackChange({canSendFeedback:!1});let n=null,i=null;try{return await _e(ge(t.connectionDelay)),n=await G(t),i=new $(t,n),t.onConversationCreated?.(i),i.markConnected(),t.onConnect?.({conversationId:n.conversationId}),i}catch(s){throw i?await i.endSession().catch(()=>{}):(t.onStatusChange?.({status:"disconnected"}),n?.close()),s}}}class E extends V{input;output;playbackEventTarget;cleanUp;type="voice";static async startSession(e){const t=V.getFullOptions(e);t.onStatusChange&&t.onStatusChange({status:"connecting"}),t.onCanSendFeedbackChange&&t.onCanSendFeedbackChange({canSendFeedback:!1});let n=null,i=null;try{return i=await je()(t),n=new E(t,i.connection,i.input,i.output,i.playbackEventTarget,i.detach),t.onConversationCreated?.(n),n.markConnected(),t.onConnect?.({conversationId:i.connection.conversationId}),n}catch(s){throw n?await n.endSession().catch(()=>{}):(i&&await i.detach().catch(()=>{}),t.onStatusChange?.({status:"disconnected"})),s}}inputFrequencyData;outputFrequencyData;handlePlaybackEvent=e=>{switch(e.data.type){case"process":this.updateMode(e.data.finished?"listening":"speaking");break;case"chunk_start":this.emitAlignmentPlayback(e.data.event_id,e.data.alignment);break}};emitAlignmentPlayback(e,t){e<this.lastInterruptTimestamp||this.options.onAudioAlignmentPlayback?.({event_id:e,alignment:t})}constructor(e,t,n,i,s,r){super(e,t),this.input=n,this.output=i,this.playbackEventTarget=s,this.cleanUp=r,s?.addListener(this.handlePlaybackEvent)}async handleEndSession(){this.playbackEventTarget?.removeListener(this.handlePlaybackEvent),this.playbackEventTarget=null,await this.cleanUp(),await super.handleEndSession(),await this.input.close(),await this.output.close()}handleInterruption(e){super.handleInterruption(e),this.updateMode("listening"),this.output.interrupt()}handleAudio(e){super.handleAudio(e),e.audio_event.alignment&&this.options.onAudioAlignment&&this.options.onAudioAlignment(e.audio_event.alignment),this.lastInterruptTimestamp<=e.audio_event.event_id&&(e.audio_event.audio_base_64&&this.options.onAudio?.(e.audio_event.audio_base_64),this.currentEventId=e.audio_event.event_id,this.updateCanSendFeedback(),this.updateMode("speaking"))}static FREQUENCY_BIN_COUNT=1024;setMicMuted(e){this.input.setMuted(e).catch(t=>{this.options.onError?.("Failed to set input muted state",t)})}getInputByteFrequencyData(){return this.inputFrequencyData??=new Uint8Array(E.FREQUENCY_BIN_COUNT),this.input.getByteFrequencyData(this.inputFrequencyData),this.inputFrequencyData}getOutputByteFrequencyData(){return this.outputFrequencyData??=new Uint8Array(E.FREQUENCY_BIN_COUNT),this.output.getByteFrequencyData(this.outputFrequencyData),this.outputFrequencyData}getInputVolume(){return this.input.getVolume()}getOutputVolume(){return this.output.getVolume()}async changeInputDevice({sampleRate:e,format:t,preferHeadphonesForIosDevices:n,inputDeviceId:i}){try{await this.input.setDevice({inputDeviceId:i,sampleRate:e,format:t,preferHeadphonesForIosDevices:n})}catch(s){throw console.error("Error changing input device",s),s}}async changeOutputDevice({sampleRate:e,format:t,outputDeviceId:n}){try{await this.output.setDevice({outputDeviceId:n,sampleRate:e,format:t})}catch(i){throw console.error("Error changing output device",i),i}}setVolume=({volume:e})=>{const t=Number.isFinite(e)?Math.min(1,Math.max(0,e)):1;this.volume=t,this.output.setVolume(t)}}const Ut="https://api.elevenlabs.io";function Nt(o,e,t=Ut){const n={};return typeof e=="boolean"?n.feedback=e?"like":"dislike":(n.rating=e.rating,n.comment=e.comment),fetch(`${t}/v1/convai/conversations/${o}/feedback`,{method:"POST",body:JSON.stringify(n),headers:{"Content-Type":"application/json"}})}class Vt{listeners=new Map;on(e,t){this.listeners.has(e)||this.listeners.set(e,new Set);const n=this.listeners.get(e);n&&n.add(t)}off(e,t){const n=this.listeners.get(e);n&&n.delete(t)}emit(e,...t){const n=this.listeners.get(e);n&&n.forEach(i=>{i(...t)})}}function $t(o){return typeof o=="object"&&o!==null&&"message_type"in o&&"error"in o&&typeof o.message_type=="string"&&typeof o.error=="string"?o:{message_type:"error",error:o instanceof Error?o.message:String(o)}}var u;(function(o){o.SESSION_STARTED="session_started",o.AUDIO_STARTED="audio_started",o.PARTIAL_TRANSCRIPT="partial_transcript",o.FINAL_TRANSCRIPT="final_transcript",o.FINAL_TRANSCRIPT_WITH_TIMESTAMPS="final_transcript_with_timestamps",o.COMMITTED_TRANSCRIPT="committed_transcript",o.COMMITTED_TRANSCRIPT_WITH_TIMESTAMPS="committed_transcript_with_timestamps",o.COMMITTED_TRANSCRIPT_ENTITIES="committed_transcript_entities",o.EDITED_TRANSCRIPT="edited_transcript",o.REDACTED_TRANSCRIPT="redacted_transcript",o.AUTH_ERROR="auth_error",o.ERROR="error",o.OPEN="open",o.CLOSE="close",o.QUOTA_EXCEEDED="quota_exceeded",o.COMMIT_THROTTLED="commit_throttled",o.TRANSCRIBER_ERROR="transcriber_error",o.UNACCEPTED_TERMS="unaccepted_terms",o.RATE_LIMITED="rate_limited",o.INPUT_ERROR="input_error",o.INVALID_REQUEST="invalid_request",o.QUEUE_OVERFLOW="queue_overflow",o.RESOURCE_EXHAUSTED="resource_exhausted",o.SESSION_TIME_LIMIT_EXCEEDED="session_time_limit_exceeded",o.CHUNK_SIZE_EXCEEDED="chunk_size_exceeded",o.INSUFFICIENT_AUDIO_ACTIVITY="insufficient_audio_activity"})(u||(u={}));class Ce{websocket=null;eventEmitter=new Vt;currentSampleRate=16e3;_muted=!1;microphoneAudioStarted=!1;_closed=!1;_audioCleanup;_mediaStreamTrack;constructor(e){this.currentSampleRate=e}get isMuted(){return this._muted}getMediaStreamTrackForMute(e){if(!this._mediaStreamTrack)throw new Error(`Cannot ${e} audio without an active microphone MediaStreamTrack. mute() and unmute() are only supported for microphone connections.`);return this._mediaStreamTrack}mute(){const e=this.getMediaStreamTrackForMute("mute");this._muted=!0,e.enabled=!1}unmute(){const e=this.getMediaStreamTrackForMute("unmute");this._muted=!1,e.enabled=!0}setWebSocket(e){this.websocket=e,this.websocket.readyState===WebSocket.OPEN?this.eventEmitter.emit(u.OPEN):this.websocket.addEventListener("open",()=>{this.eventEmitter.emit(u.OPEN)}),this.websocket.addEventListener("message",t=>{try{const n=JSON.parse(t.data);switch(n.message_type){case"session_started":this.eventEmitter.emit(u.SESSION_STARTED,n);break;case"partial_transcript":this.eventEmitter.emit(u.PARTIAL_TRANSCRIPT,n);break;case"final_transcript":this.eventEmitter.emit(u.FINAL_TRANSCRIPT,n);break;case"final_transcript_with_timestamps":this.eventEmitter.emit(u.FINAL_TRANSCRIPT_WITH_TIMESTAMPS,n);break;case"committed_transcript":this.eventEmitter.emit(u.COMMITTED_TRANSCRIPT,n);break;case"committed_transcript_with_timestamps":this.eventEmitter.emit(u.COMMITTED_TRANSCRIPT_WITH_TIMESTAMPS,n);break;case"committed_transcript_entities":this.eventEmitter.emit(u.COMMITTED_TRANSCRIPT_ENTITIES,n);break;case"edited_transcript":this.eventEmitter.emit(u.EDITED_TRANSCRIPT,n);break;case"redacted_transcript":this.eventEmitter.emit(u.REDACTED_TRANSCRIPT,n);break;case"auth_error":this.eventEmitter.emit(u.AUTH_ERROR,n),this.eventEmitter.emit(u.ERROR,n);break;case"quota_exceeded":this.eventEmitter.emit(u.QUOTA_EXCEEDED,n),this.eventEmitter.emit(u.ERROR,n);break;case"commit_throttled":this.eventEmitter.emit(u.COMMIT_THROTTLED,n),this.eventEmitter.emit(u.ERROR,n);break;case"transcriber_error":this.eventEmitter.emit(u.TRANSCRIBER_ERROR,n),this.eventEmitter.emit(u.ERROR,n);break;case"unaccepted_terms":this.eventEmitter.emit(u.UNACCEPTED_TERMS,n),this.eventEmitter.emit(u.ERROR,n);break;case"rate_limited":this.eventEmitter.emit(u.RATE_LIMITED,n),this.eventEmitter.emit(u.ERROR,n);break;case"input_error":this.eventEmitter.emit(u.INPUT_ERROR,n),this.eventEmitter.emit(u.ERROR,n);break;case"invalid_request":this.eventEmitter.emit(u.INVALID_REQUEST,n),this.eventEmitter.emit(u.ERROR,n);break;case"queue_overflow":this.eventEmitter.emit(u.QUEUE_OVERFLOW,n),this.eventEmitter.emit(u.ERROR,n);break;case"resource_exhausted":this.eventEmitter.emit(u.RESOURCE_EXHAUSTED,n),this.eventEmitter.emit(u.ERROR,n);break;case"session_time_limit_exceeded":this.eventEmitter.emit(u.SESSION_TIME_LIMIT_EXCEEDED,n),this.eventEmitter.emit(u.ERROR,n);break;case"chunk_size_exceeded":this.eventEmitter.emit(u.CHUNK_SIZE_EXCEEDED,n),this.eventEmitter.emit(u.ERROR,n);break;case"insufficient_audio_activity":this.eventEmitter.emit(u.INSUFFICIENT_AUDIO_ACTIVITY,n),this.eventEmitter.emit(u.ERROR,n);break;case"error":this.eventEmitter.emit(u.ERROR,n);break;default:console.warn("Unknown message type:",n)}}catch(n){console.error("Failed to parse WebSocket message:",n,t.data),this._emitError(new Error(`Failed to parse message: ${n}`))}}),this.websocket.addEventListener("error",t=>{this._closed||(console.error("WebSocket error:",t),this._emitError(new Error("WebSocket error")))}),this.websocket.addEventListener("close",t=>{const n=this._closed;if(this._closed=!0,!n&&(console.log(`WebSocket closed: code=${t.code}, reason="${t.reason}", wasClean=${t.wasClean}`),!t.wasClean||t.code!==1e3&&t.code!==1005)){const i=`WebSocket closed unexpectedly: ${t.code} - ${t.reason||"No reason provided"}`;console.error(i),this._emitError(new Error(i))}this._audioCleanup&&(this._audioCleanup(),this._audioCleanup=void 0),this.eventEmitter.emit(u.CLOSE,t)})}on(e,t){this.eventEmitter.on(e,t)}off(e,t){this.eventEmitter.off(e,t)}_emitMicrophoneAudioStarted(){this._closed||this.microphoneAudioStarted||(this.microphoneAudioStarted=!0,this.eventEmitter.emit(u.AUDIO_STARTED))}_emitError(e){this.eventEmitter.emit(u.ERROR,$t(e))}send(e){if(!this.websocket||this.websocket.readyState!==WebSocket.OPEN)throw new Error("WebSocket is not connected");const t={message_type:"input_audio_chunk",audio_base_64:e.audioBase64,commit:e.commit??!1,sample_rate:e.sampleRate??this.currentSampleRate,previous_text:e.previousText};this.websocket.send(JSON.stringify(t))}commit(){if(!this.websocket||this.websocket.readyState!==WebSocket.OPEN)throw new Error("WebSocket is not connected");const e={message_type:"input_audio_chunk",audio_base_64:"",commit:!0,sample_rate:this.currentSampleRate};this.websocket.send(JSON.stringify(e))}close(){this._closed=!0,this._audioCleanup&&(this._audioCleanup(),this._audioCleanup=void 0),this.websocket&&this.websocket.close(1e3,"User ended session")}}var Q;(function(o){o.PCM_8000="pcm_8000",o.PCM_16000="pcm_16000",o.PCM_22050="pcm_22050",o.PCM_24000="pcm_24000",o.PCM_44100="pcm_44100",o.PCM_48000="pcm_48000",o.ULAW_8000="ulaw_8000"})(Q||(Q={}));var K;(function(o){o.MANUAL="manual",o.VAD="vad"})(K||(K={}));class A{static DEFAULT_BASE_URI="wss://api.elevenlabs.io";static getWebSocketUri(e=A.DEFAULT_BASE_URI){return`${e}/v1/speech-to-text/realtime`}static buildWebSocketUri(e){const t=A.getWebSocketUri(e.baseUri),n=new URLSearchParams;if(n.append("model_id",e.modelId),n.append("token",e.token),e.commitStrategy!==void 0&&n.append("commit_strategy",e.commitStrategy),e.audioFormat!==void 0&&n.append("audio_format",e.audioFormat),e.vadSilenceThresholdSecs!==void 0){if(e.vadSilenceThresholdSecs<.3||e.vadSilenceThresholdSecs>3)throw new Error("vadSilenceThresholdSecs must be between 0.3 and 3.0");n.append("vad_silence_threshold_secs",e.vadSilenceThresholdSecs.toString())}if(e.vadThreshold!==void 0){if(e.vadThreshold<.1||e.vadThreshold>.9)throw new Error("vadThreshold must be between 0.1 and 0.9");n.append("vad_threshold",e.vadThreshold.toString())}if(e.minSpeechDurationMs!==void 0){if(e.minSpeechDurationMs<50||e.minSpeechDurationMs>2e3)throw new Error("minSpeechDurationMs must be between 50 and 2000");n.append("min_speech_duration_ms",e.minSpeechDurationMs.toString())}if(e.minSilenceDurationMs!==void 0){if(e.minSilenceDurationMs<50||e.minSilenceDurationMs>2e3)throw new Error("minSilenceDurationMs must be between 50 and 2000");n.append("min_silence_duration_ms",e.minSilenceDurationMs.toString())}if(e.languageCode!==void 0&&n.append("language_code",e.languageCode),e.secondaryLanguages!==void 0)for(const s of e.secondaryLanguages)n.append("secondary_languages",s);if(e.includeTimestamps!==void 0&&n.append("include_timestamps",e.includeTimestamps?"true":"false"),e.includeLanguageDetection!==void 0&&n.append("include_language_detection",e.includeLanguageDetection?"true":"false"),e.keyterms!==void 0)for(const s of e.keyterms)n.append("keyterms",s);if(e.noVerbatim!==void 0&&n.append("no_verbatim",e.noVerbatim?"true":"false"),e.entityDetection!==void 0){const s=Array.isArray(e.entityDetection)?e.entityDetection:[e.entityDetection];for(const r of s)n.append("entity_detection",r)}if(e.entityRedaction!==void 0){const s=Array.isArray(e.entityRedaction)?e.entityRedaction:[e.entityRedaction];for(const r of s)n.append("entity_redaction",r)}e.entityRedactionMode!==void 0&&n.append("entity_redaction_mode",e.entityRedactionMode),e.transcriptEdit!==void 0&&n.append("transcript_edit",e.transcriptEdit),e.filterBackgroundAudio!==void 0&&n.append("filter_background_audio",e.filterBackgroundAudio?"true":"false"),e.enableLogging!==void 0&&n.append("enable_logging",e.enableLogging?"true":"false");const i=n.toString();return i?`${t}?${i}`:t}static connect(e){if(!e.modelId)throw new Error("modelId is required");const t="microphone"in e&&e.microphone?16e3:e.sampleRate,n=new Ce(t),i=A.buildWebSocketUri(e),s=new WebSocket(i);return"microphone"in e&&e.microphone&&s.addEventListener("open",()=>{A.streamFromMicrophone(e,n)}),n.setWebSocket(s),n}static async streamFromMicrophone(e,t){try{const n=bt();let i=e.previousText;const s=await n(e.microphone??{},r=>{t._closed||(t.send({audioBase64:r,previousText:i}),t._emitMicrophoneAudioStarted(),i=void 0)});t._mediaStreamTrack=s.mediaStreamTrack,t._audioCleanup=s.cleanup,t._closed&&(s.cleanup(),t._audioCleanup=void 0)}catch(n){console.error("Failed to start microphone streaming:",n),t._emitError(n),t.close()}}}const Wt={async startSession(o){return Ft(),ke(o)?$.startSession(o):E.startSession(o)}};ft(),Le(()=>new wt),St(Tt);export{Q as AudioFormat,K as CommitStrategy,Wt as Conversation,pe as DEFAULT_INPUT_CHUNK_DURATION_MS,Ce as RealtimeConnection,u as RealtimeEvents,A as Scribe,W as SessionConnectionError,$ as TextConversation,E as VoiceConversation,M as WebRTCConnection,P as WebSocketConnection,G as createConnection,Nt as postOverallFeedback,N as stripAudioTags};
//# sourceMappingURL=/sm/5081a6a91b653e55cf22f36e397b448b6306b78f39e4fba51bd1e4bbd0463bc6.map
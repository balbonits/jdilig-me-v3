// Proto exports
import { DocsHomeProto } from './docs-home';
import { ProtosPageProto } from './protos-page';
import { DocsContentProto } from './docs-content';

export { DocsHomeProto, ProtosPageProto, DocsContentProto };

// Proto registry for dynamic loading
export const protos = {
  'docs-home': DocsHomeProto,
  'protos-page': ProtosPageProto,
  'docs-content': DocsContentProto,
};

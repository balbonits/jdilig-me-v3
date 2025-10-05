// Proto exports
import { DocsHomeProto } from './docs-home';
import { ProtosPageProto } from './protos-page';
import { DocsContentProto } from './docs-content';
import { HomepageProto } from './homepage';

export { DocsHomeProto, ProtosPageProto, DocsContentProto, HomepageProto };

// Proto registry for dynamic loading
export const protos = {
  'docs-home': DocsHomeProto,
  'protos-page': ProtosPageProto,
  'docs-content': DocsContentProto,
  'homepage': HomepageProto,
};

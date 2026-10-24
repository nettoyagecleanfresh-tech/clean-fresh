// Test-only resolver: keep production imports and application code unchanged.
import { registerHooks } from 'node:module';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('@/')) {
      const path = new URL('../src/' + specifier.slice(2), import.meta.url);
      const candidate = existsSync(fileURLToPath(path)) ? path : new URL(path.href + '.ts');
      return nextResolve(candidate.href, context);
    }
    if (specifier.startsWith('.') && context.parentURL?.startsWith('file:')) {
      const path = new URL(specifier, context.parentURL);
      if (!existsSync(fileURLToPath(path))) {
        const candidate = new URL(path.href.endsWith('.js') ? path.href.slice(0, -3) + '.ts' : path.href + '.ts');
        if (existsSync(fileURLToPath(candidate))) return nextResolve(candidate.href, context);
      }
    }
    return nextResolve(specifier, context);
  },
});

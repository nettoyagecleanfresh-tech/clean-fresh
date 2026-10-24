import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { responsiveRealisation } from '../src/lib/responsiveRealisation.ts';
import { realisations } from '../src/data/realisations.ts';

test('every responsive image candidate exists after the production build', () => {
  for (const photo of realisations) {
    for (const source of [photo.src, photo.beforeSrc].filter(Boolean)) {
      const image = responsiveRealisation(source);
      assert.ok(existsSync(`public${image.src}`), image.src);
      if (!image.srcSet) continue;
      for (const candidate of image.srcSet.split(', ')) {
        const filename = candidate.split(' ')[0];
        assert.ok(existsSync(`public${filename}`), filename);
        assert.ok(statSync(`public${filename}`).size < statSync(`public${source}`).size);
      }
    }
  }
  assert.deepEqual(responsiveRealisation('/logo.webp'), { src: '/logo.webp' });
});

test('navigation preloads on intent without changing live data freshness or scroll restoration', () => {
  const router = readFileSync('src/router.tsx', 'utf8');
  assert.match(router, /defaultPreload: "intent"/);
  assert.match(router, /defaultPreloadStaleTime: 0/);
  assert.match(router, /scrollRestoration: true/);
  assert.match(router, /defaultPendingMinMs: 0/);
});

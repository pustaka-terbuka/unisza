import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SOURCE_CODE,
  AGENCY_CODE,
  DEFAULT_SCHEME,
  validateRecordContent,
  recordToMarcXml
} from '../tools/harvesters/unisza/harvester.js';

test('UniSZA Harvester Configuration', () => {
  assert.equal(SOURCE_CODE, 'unisza');
  assert.equal(AGENCY_CODE, 'UniSZA');
  assert.equal(DEFAULT_SCHEME, 'LCC');
});

test('UniSZA Record Conversion to MARCXML', () => {
  const dummy = {
    id: 101,
    title: 'Pengantar Sains Perpustakaan',
    author: 'Ahmad bin Abdullah',
    callNumber: 'Z665 .A36 2020',
    publication: 'Terengganu : Penerbit Universiti Sultan Zainal Abidin, 2020.',
    physicalDescription: 'xiv, 250 ms. : il. ; 25 cm.',
    subject: 'Library science -- Malaysia'
  };
  const xml = recordToMarcXml(dummy);
  assert.ok(xml, 'Should produce MARCXML');
  assert.ok(xml.includes('<record'), 'XML should contain record open tag');
  assert.ok(xml.includes('</record>'), 'XML should contain record close tag');
  assert.ok(xml.includes('tag="050"'), 'XML should contain LCC call number tag 050');
  assert.ok(xml.includes('tag="996"'), 'XML should contain provenance tag 996');
  assert.ok(validateRecordContent(xml), 'Generated MARCXML must pass validation');
});

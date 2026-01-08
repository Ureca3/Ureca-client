export default {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^\[(?<ticket>[A-Z]+-\d+)\]\s(?<type>\w+)(?:\((?<scope>[^)]+)\))?:\s(?<subject>.+)$/,
      headerCorrespondence: ['ticket', 'type', 'scope', 'subject'],
    },
  },
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'style', 'format', 'docs', 'chore', 'add', 'del', 'test'],
    ],
  },
};

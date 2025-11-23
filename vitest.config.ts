import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['test/**/*.ts'],
      exclude: [
        'test/**/*.test.ts',
        'test/**/*.d.ts',
        'test/errors.ts'
      ],
    },
  },
})

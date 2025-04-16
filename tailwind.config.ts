module.exports = {
    theme: {
        extend: {
            colors: {
                'electric-blue': {
                    400: '#00f2fe',
                    500: '#00d4ff',
                },
                blue: {
                    500: '#3b82f6',  // Bleu électrique
                    600: '#2563eb',
                },
                purple: {
                    500: '#8b5cf6',  // Violet
                    600: '#7c3aed',
                },
                red: {
                    500: '#ef4444',  // Rouge amour
                    600: '#dc2626',
                }
            },
            textShadow: {
                neon: '0 0 5px #00f2fe, 0 0 10px #00d4ff, 0 0 15px #ff4d6d, 0 0 20px #ff0a54',
            },
        },
    },
    plugins: [
        function ({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) {
            const newUtilities = {
                '.text-shadow-neon': {
                    'text-shadow': '0 0 5px #00f2fe, 0 0 10px #00d4ff, 0 0 15px #ff4d6d, 0 0 20px #ff0a54',
                },
            }
            addUtilities(newUtilities)
        }
    ],
}
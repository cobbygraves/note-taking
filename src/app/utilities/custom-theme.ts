import { definePreset } from '@primeng/themes';
import Material from '@primeng/themes/material';

const MyPreset = definePreset(Material, {
  components: {
    drawer: {
      colorScheme: {
        light: {
          root: {
            background: '#ffffff',
            color: '#232530',
          },
        },
        dark: {
          root: {
            background: '#232530',
            color: '#ffffff',
          },
        },
      },
    },
  },
});

export default MyPreset;

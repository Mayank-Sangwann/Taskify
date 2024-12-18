import React from 'react'; 
import { View } from 'react-native'; 
import Svg, { Path } from 'react-native-svg';

/**
 * WavyHeader component renders a decorative header with a wavy design.
 * 
 * @param {object} props - Component properties
 * @param {object} props.customStyles - Custom styles to be applied to the header.
 * @returns {JSX.Element} - A wavy header component.
 */
export default function WavyHeader({ customStyles }) {
  return (
    // Main container for the header, styled with custom styles
    <View style={customStyles}>
      {/* Background view for the header */}
      <View style={{ backgroundColor: '#9381FF', height: 160 }}>
        <Svg
          height="90%" // Height of the SVG to cover 90% of the parent view
          width="100%" // Full width of the parent view
          viewBox="0 0 1440 320" // Viewbox dimensions for the SVG path
          style={{ position: 'absolute', top: 130 }} // Positioning the SVG relative to the parent view
        >
          <Path
            fill="#9381FF" // Fill color for the wavy path
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </Svg>
      </View>
    </View>
  );
}


import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
// screen imports
import ListScreen from "./screens/ListScreen";
import DetailsScreen from './screens/DetailsScreen';
import FavoritesScreen from './screens/FavoritesScreen';

// react navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// creating the default Tab and Stack objects
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// This is a component that creates a stack navigator
// The pokemon list and details screen are connected sequentially using a stack
// - You could create this component in a separate file (example: PokemonStackNavContainer.js)
// - However, for simplicity we put it in the App.js file
function PokemonStackNavContainer() {
  return (
    <Stack.Navigator>
      {/* The first screen in the stack is the PokemonList */}
      <Stack.Screen 
          name="ListScreen" 
          component={ListScreen}
          options={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
      />
      {/* The second screen in the stack is the Pokemon Details screen */}
      <Stack.Screen 
        name="DetailsScreen" 
        component={DetailsScreen}
        options={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },          
        }}
    />
    </Stack.Navigator>
  )
}



// This is the main screen of the application
// - By default The application displays a Tab Navigator
// 
export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Set the icon based on the route name
          if (route.name === 'World Countries') {
            iconName = focused ? 'earth' : 'earth-outline';
          } else if (route.name === 'Favorites List') {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* The first tab is the stack navigator, defined above */}
      <Tab.Screen  options={{headerShown:false,}} name="World Countries" component={PokemonStackNavContainer} />
      {/* The second tab is the Favorites screen */}
      <Tab.Screen name="Favorites List" component={FavoritesScreen} 
       options={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },          
      }}
    />
    </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

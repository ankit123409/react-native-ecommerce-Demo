import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AppScreenNames } from "./app-screen-names";
import DashboardScreen from "../presentation/screens/dashboard/dashboard-screen";
import DrawerNavigator from "./drawer-navigator";
import ProductScreen from "../presentation/screens/product/product-screen";


const AppStack = createStackNavigator();

const AppNavigator = () => {
  return (
    <AppStack.Navigator
      initialRouteName={AppScreenNames.drawerNavigator}
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: false,
      })}
    >
      <AppStack.Screen
        name={AppScreenNames.dashBoard}
                            component={DashboardScreen}
                        />
        <AppStack.Screen        
          name={AppScreenNames.drawerNavigator}
          component={DrawerNavigator}
        />
        <AppStack.Screen
          name={AppScreenNames.productScreen}
          component={ProductScreen}
        />
    </AppStack.Navigator>
  );
};

export default AppNavigator;

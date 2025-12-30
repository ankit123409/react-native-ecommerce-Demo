import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { AppScreenNames } from "./app-screen-names";
import BottomTabStack from "./bottom-tab-stack";


const Drawer = createDrawerNavigator();

// const CustomDrawerContent = (props: any) => <DrawerComponent {...props} />;

const DrawerNavigator = (props: any) => {


  return (
    <Drawer.Navigator
    //   drawerContent={CustomDrawerContent}
      initialRouteName={
       AppScreenNames.bottomTabStack
      }
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: true,
        swipeEnabled: true,
        drawerType: "front",
      })}
    >
      
        <Drawer.Screen
          name={AppScreenNames.bottomTabStack}
          component={BottomTabStack}
          options={{ headerShown: false }}
        />
      
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

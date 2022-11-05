import { Box } from 'native-base';
import { NavigationContainer} from '@react-navigation/native';

import { useAuth } from '../hooks/useAuth';

import { AppRoutes } from './app.routes';
import { SignIn } from '../screens/SignIn'

export function Routes() {
    const { user } = useAuth();

    return (
        <Box flex={1} color="gray.900">
        <NavigationContainer>
        {user.name ? <AppRoutes /> : <SignIn />}
        </NavigationContainer>
        </Box>
    );
}
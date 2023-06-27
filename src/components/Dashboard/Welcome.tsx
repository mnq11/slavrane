
// Welcome.tsx
import {User} from "../../hooks/useUser";

interface WelcomeProps {
    user: User | { name: string };
}

const Welcome: React.FC<WelcomeProps> = ({ user }) => (
    <div>
        <h1>Welcome to the app, {user.name}!</h1>
    </div>
);

export default Welcome;
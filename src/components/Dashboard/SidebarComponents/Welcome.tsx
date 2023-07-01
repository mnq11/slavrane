
// Welcome.tsx
import {Member} from "../../../hooks/useMember";

interface WelcomeProps {
    member: Member | { FullName: string }; // Changed from 'name' to 'FullName'
}

const Welcome: React.FC<WelcomeProps> = ({ member }) => (
    <div>
        <h1>Welcome to the app, {member.FullName}!</h1>
    </div>
);

export default Welcome;
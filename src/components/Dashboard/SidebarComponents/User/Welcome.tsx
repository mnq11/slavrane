
// Welcome.tsx
import {Member} from "../../../../hooks/useMember";

interface WelcomeProps {
    member: Member | null;

}

const Welcome: React.FC<WelcomeProps> = ({ member }) => (
    <div>
        <h1>Welcome to the app, {member?.MemberName}!</h1>
    </div>
);

export default Welcome;
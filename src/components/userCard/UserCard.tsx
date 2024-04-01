import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import './UserCard.css';
import { useNavigate } from 'react-router-dom';

function UserCard(user: any, postCount: any) {
    const navigate = useNavigate();

    const viewUserPosts = () => {
        navigate(`/user/${user.id}/posts`); // Adjust based on your routing setup
      };


    return (
        <Card style={{ width: '18rem' }} className="mb-2">
            <Card.Body>
                <Card.Title>{user.displayName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Posts: {postCount}</Card.Subtitle>
                <ListGroup variant="flush">
                <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                    {/* Add more user details here */}
                </ListGroup>
            <Button variant="primary" onClick={viewUserPosts}>View Posts</Button>
          </Card.Body>
        </Card>
      );
    }
export default UserCard;


import { Link } from "react-router-dom";
export default function Home() {
    return (
        <>
            <h2>Things to do before you kick the bucket</h2>
            <Link to="/bucketlist">View BucketList</Link>
        </>
        
    );
}
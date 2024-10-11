import React, { useState } from 'react';
import { uploadImage } from '../api';

interface Props {
    token: string;
    onUploadComplete: () => void;
}

const Upload: React.FC<Props> = ({ token }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = async () => {
        if (file) {
            console.log(token);
            
            await uploadImage(file, token);
            alert('Image uploaded successfully');
            onUploadComplete();
        }
    };

    return (
        <div className='container'>
            <form>
                <div className="mb-3">
                <label htmlFor="fileupload" className="form-label">Email address</label>
                <input type="file" className="form-control" id="fileupload" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <button type="submit" className="btn btn-primary"onClick={handleUpload}>Upload</button>
            </form>
        </div>
        
    );
};

export default Upload;

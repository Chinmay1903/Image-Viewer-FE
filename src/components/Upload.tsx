import React, { useState } from 'react';
import { uploadImage } from '../api';

interface Props {
    token: string;
    isRefresh: (refresh: boolean) => void;
}

const Upload: React.FC<Props> = ({ token, isRefresh }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = async () => {

        if (file) {
            console.log(token);
            try {
                const response = await uploadImage(file, token);
                if (response.ok) {
                    alert('Image uploaded successfully');
                    isRefresh(true);
                }
            } catch (error) {
                console.error('Upload failed:', error);
            }
        }
    };

    return (
        <div className='container'>
            <form>
                <div className="mb-3">
                <label htmlFor="fileupload" className="form-label">Upload Image</label>
                <input type="file" className="form-control" id="fileupload" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                </div>
                <button type="button" className="btn btn-primary"onClick={handleUpload}>Upload</button>
            </form>
        </div>
        
    );
};

export default Upload;

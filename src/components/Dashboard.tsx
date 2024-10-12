import React, { useEffect, useState } from 'react';
import { getImages } from '../api';
import Upload from './Upload';

interface Props {
    token: string;
}

const Dashboard: React.FC<Props> = ({ token }) => {
    const [images, setImages] = useState<any[]>([]);
    const [refresh, setRefresh] = useState(1);

    const fetchImages = async () => {
        console.log('image fetching');
        // console.log(refresh)
        const data = await getImages(token);            
        setImages(data.images);
    };
    
    const refreshImages = () => {
        console.log(refresh);
        setRefresh(Math.random());
    };

    useEffect(() => {
        fetchImages();
    }, [refresh]);

    return (
        <div>
            <Upload token={token} onUploadComplete={refreshImages}/>
            <div className='container-fluid mt-4'>
                <h2 className='text-center my-4'>Your Uploaded Images</h2>
                <div className="row row-cols-3 text-center">
                    {images.map(image => (
                        <div className="col p-1" key={image.id}>
                            <img src={image.url} alt={image.file_name} width="200" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

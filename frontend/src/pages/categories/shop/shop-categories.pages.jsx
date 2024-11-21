import { useEffect, useState } from 'react';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Spinner from '../../../components/reusable/spinner/spinner.component';

import Client from '../../../tools/client';

import {
    CategoriesPreviewContainer
} from '../categories.styles';

const client = new Client();

const ShopCategories = () => {
    const [ loading, setLoading ] = useState(true);
    const [ seedCategories, setSeedCategories ] = useState([]);
    const [ cloneCategories, setCloneCategories ] = useState([]);
    const [ merchandiseCategories, setMerchandiseCategories ] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const res = await client.getAllCategories();

        const clones = res.rows.filter(category => category.type === 'clones');
        setCloneCategories(clones);

        const merchandise = res.rows.filter(category => category.type === 'merchandise');
        setMerchandiseCategories(merchandise);

        const seeds = res.rows.filter(category => category.type === 'seeds');
        setSeedCategories(seeds);

        setLoading(false);
    }
    

    return (
        <CategoriesPreviewContainer>
            {loading ?
             <Spinner />
            :
                <>
                    {seedCategories.length > 0 &&
                        <CategoriesPreview category={seedCategories} />
                    }
                    {cloneCategories.length > 0 &&
                        <CategoriesPreview category={cloneCategories} />
                    }
                    {merchandiseCategories.length > 0 &&
                        <CategoriesPreview category={merchandiseCategories} />
                    }
                </>
            }
        </CategoriesPreviewContainer>
    )
}

export default ShopCategories;
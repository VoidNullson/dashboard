import { Metadata } from 'next';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/invoices/edit-form';

export const metadata: Metadata = {
    title: 'Edit Invoice',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [ invoice, customers ] = await Promise.all([ fetchInvoiceById( id ), fetchCustomers() ]);

    if ( !invoice ) {
        notFound();
    }

    return (
        <>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' },
                    { label: 'Edit Invoice', href: `/dashboard/invoices/${ id }/edit`, active: true },
                ]}
            />
            <Form invoice={ invoice } customers={ customers }/>
        </>
    );
}
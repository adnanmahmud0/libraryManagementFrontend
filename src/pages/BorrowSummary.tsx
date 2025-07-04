import BorrowSummaryTable from "@/components/BorrowSummary/BorrowSummaryTable";
import Title from "@/components/header/Title";

export default function BorrowSummary() {
    return (
        <>
            <div className="pt-20">
                <Title title={"Book Borrow Summary"} />
                <div className="container mx-auto pt-15">
                    <BorrowSummaryTable />
                </div>
            </div>
        </>

    );
}

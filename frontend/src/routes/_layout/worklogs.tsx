"use client"

import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getWorklogs } from "@/data/mockWorklogs"

export const Route = createFileRoute("/_layout/worklogs")({
    component: WorklogsPage,
    head: () => ({
        meta: [{ title: "Worklogs - Payment Dashboard" }],
    }),
})

const DATE_RANGES = [
    { label: "All Time", value: "all" },
    { label: "Jan 2026", value: "2026-01" },
    { label: "Feb 2026", value: "2026-02" },
    { label: "Mar 2026", value: "2026-03" },
]

function WorklogsPage() {
    const navigate = useNavigate()
    const [allData, setAllData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [activeFilter, setActiveFilter] = useState("all")
    const [page, setPage] = useState(1)
    const pageSize = 10

    useEffect(() => {
        async function loadWorklogs() {
            try {
                setIsLoading(true)
                const data = await getWorklogs()
                setAllData(data)
            } catch (err) {
                setError("Failed to load worklogs. Please try again.")
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        loadWorklogs()
    }, [])

    const filteredData =
        activeFilter === "all"
            ? allData
            : allData.filter((wl: any) => wl.created_at.startsWith(activeFilter))

    const displayed = filteredData.slice((page - 1) * pageSize, page * pageSize)
    const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize))

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        )
    }

    const toggleSelectAll = () => {
        const displayedIds = displayed.map((wl: any) => wl.id)
        const allSelected = displayedIds.every((id: string) =>
            selectedIds.includes(id),
        )
        if (allSelected) {
            setSelectedIds((prev) =>
                prev.filter((id) => !displayedIds.includes(id)),
            )
        } else {
            setSelectedIds((prev) => [
                ...prev,
                ...displayedIds.filter((id: string) => !prev.includes(id)),
            ])
        }
    }

    const handleReviewPayment = () => {
        if (selectedIds.length === 0) return
        navigate({
            to: "/payment-review",
            search: { ids: selectedIds.join(",") },
        })
    }

    const statusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "outline"
            case "approved":
                return "default"
            case "paid":
                return "secondary"
            default:
                return "outline"
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-20">
                <Card className="max-w-md">
                    <CardContent className="pt-6 text-center">
                        <p className="text-destructive font-medium">{error}</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const totalEarnings = filteredData.reduce(
        (sum: number, wl: any) => sum + wl.total_earnings,
        0,
    )
    const totalHours = filteredData.reduce(
        (sum: number, wl: any) => sum + wl.total_hours,
        0,
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Worklogs</h1>
                    <p className="text-muted-foreground">
                        Review freelancer work and process payments
                    </p>
                </div>
                <Button
                    onClick={handleReviewPayment}
                    disabled={selectedIds.length === 0}
                    className="self-start"
                >
                    Review Payment ({selectedIds.length})
                </Button>
            </div>

            {/* Summary cards */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Worklogs</CardDescription>
                        <CardTitle className="text-3xl">{filteredData.length}</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Hours</CardDescription>
                        <CardTitle className="text-3xl">{totalHours.toFixed(1)}</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Earnings</CardDescription>
                        <CardTitle className="text-3xl">
                            ${totalEarnings.toLocaleString()}
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>

            {/* Date range filter as exclusive tabs */}
            <div>
                <Tabs value={activeFilter} onValueChange={(v) => { setActiveFilter(v); setPage(1) }}>
                    <TabsList>
                        {DATE_RANGES.map((range) => (
                            <TabsTrigger key={range.value} value={range.value}>
                                {range.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>

            {/* Worklogs table */}
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">
                                    <Checkbox
                                        checked={
                                            displayed.length > 0 &&
                                            displayed.every((wl: any) =>
                                                selectedIds.includes(wl.id),
                                            )
                                        }
                                        onCheckedChange={toggleSelectAll}
                                        aria-label="Select all worklogs on this page"
                                    />
                                </TableHead>
                                <TableHead>Task</TableHead>
                                <TableHead>Freelancer</TableHead>
                                <TableHead className="text-right">Hours</TableHead>
                                <TableHead className="text-right">Earnings</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {displayed.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                                        No worklogs found for the selected period
                                    </TableCell>
                                </TableRow>
                            ) : (
                                displayed.map((wl: any) => (
                                    <TableRow
                                        key={wl.id}
                                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                                        onClick={() =>
                                            navigate({
                                                to: "/worklogs/$worklogId",
                                                params: { worklogId: wl.id },
                                            })
                                        }
                                    >
                                        <TableCell onClick={(e) => e.stopPropagation()}>
                                            <Checkbox
                                                checked={selectedIds.includes(wl.id)}
                                                onCheckedChange={() => toggleSelect(wl.id)}
                                                aria-label={`Select worklog ${wl.task_name}`}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">{wl.task_name}</TableCell>
                                        <TableCell>{wl.freelancer_name}</TableCell>
                                        <TableCell className="text-right">{wl.total_hours}</TableCell>
                                        <TableCell className="text-right font-medium">
                                            ${wl.total_earnings.toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={statusColor(wl.status)}>
                                                {wl.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {wl.created_at}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Page {page} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    )
}

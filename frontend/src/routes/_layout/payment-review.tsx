"use client"

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

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
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getWorklogsByIds } from "@/data/mockWorklogs"

export const Route = createFileRoute("/_layout/payment-review")({
    component: PaymentReviewPage,
    head: () => ({
        meta: [{ title: "Review Payment - Payment Dashboard" }],
    }),
    validateSearch: (search: Record<string, unknown>) => ({
        ids: (search.ids as string) ?? "",
    }),
})

function PaymentReviewPage() {
    const { ids } = Route.useSearch()
    const navigate = useNavigate()
    const [allWorklogs, setAllWorklogs] = useState<any[]>([])
    const [excludedWorklogIds, setExcludedWorklogIds] = useState<string[]>([])
    const [excludedFreelancerIds, setExcludedFreelancerIds] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isConfirming, setIsConfirming] = useState(false)

    useEffect(() => {
        async function loadWorklogs() {
            try {
                setIsLoading(true)
                const idList = ids ? ids.split(",") : []
                if (idList.length === 0) {
                    setError("No worklogs selected for payment review.")
                    return
                }
                const data = await getWorklogsByIds(idList)
                setAllWorklogs(data)
            } catch (err) {
                setError("Failed to load worklogs for review. Please try again.")
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        loadWorklogs()
    }, [ids])

    const activeWorklogs = allWorklogs.filter(
        (wl: any) =>
            !excludedWorklogIds.includes(wl.id) &&
            !excludedFreelancerIds.includes(wl.freelancer?.id),
    )

    const totalHours = activeWorklogs.reduce(
        (sum: number, wl: any) => sum + wl.total_hours,
        0,
    )
    const totalEarnings = activeWorklogs.reduce(
        (sum: number, wl: any) => sum + wl.total_earnings,
        0,
    )

    // Get unique freelancers from all worklogs
    const freelancerMap = new Map<string, any>()
    for (const wl of allWorklogs) {
        if (wl.freelancer && !freelancerMap.has(wl.freelancer.id)) {
            freelancerMap.set(wl.freelancer.id, wl.freelancer)
        }
    }
    const freelancers = Array.from(freelancerMap.values())

    const toggleExcludeWorklog = (id: string) => {
        setExcludedWorklogIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        )
    }

    const toggleExcludeFreelancer = (freelancerId: string) => {
        setExcludedFreelancerIds((prev) =>
            prev.includes(freelancerId)
                ? prev.filter((i) => i !== freelancerId)
                : [...prev, freelancerId],
        )
    }

    const handleConfirmPayment = async () => {
        setIsConfirming(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsConfirming(false)
        toast.success(
            `Payment confirmed! ${activeWorklogs.length} worklogs totalling $${totalEarnings.toLocaleString()} processed.`,
        )
        navigate({ to: "/worklogs" })
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
            <div className="space-y-4">
                <Link to="/worklogs">
                    <Button variant="ghost" size="sm">
                        ← Back to Worklogs
                    </Button>
                </Link>
                <Card className="max-w-md mx-auto">
                    <CardContent className="pt-6 text-center">
                        <p className="text-destructive font-medium">{error}</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Payment Review</h1>
                    <p className="text-muted-foreground">
                        Review and confirm payment for selected worklogs
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link to="/worklogs">
                        <Button variant="outline">Cancel</Button>
                    </Link>
                    <Button
                        onClick={handleConfirmPayment}
                        disabled={activeWorklogs.length === 0 || isConfirming}
                    >
                        {isConfirming ? "Processing..." : `Confirm Payment ($${totalEarnings.toLocaleString()})`}
                    </Button>
                </div>
            </div>

            {/* Payment summary */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Active Worklogs</CardDescription>
                        <CardTitle className="text-3xl">{activeWorklogs.length}</CardTitle>
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
                        <CardDescription>Total Payment</CardDescription>
                        <CardTitle className="text-3xl text-primary">
                            ${totalEarnings.toLocaleString()}
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>

            {/* Freelancer exclusion */}
            <Card>
                <CardHeader>
                    <CardTitle>Freelancers in Batch</CardTitle>
                    <CardDescription>
                        Uncheck a freelancer to exclude all their worklogs from this payment
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4">
                        {freelancers.map((freelancer: any) => {
                            const isExcluded = excludedFreelancerIds.includes(freelancer.id)
                            return (
                                <label
                                    key={freelancer.id}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${isExcluded
                                            ? "border-destructive/50 bg-destructive/10 opacity-60"
                                            : "border-border hover:bg-muted"
                                        }`}
                                >
                                    <Checkbox
                                        checked={!isExcluded}
                                        onCheckedChange={() => toggleExcludeFreelancer(freelancer.id)}
                                        aria-label={`Include ${freelancer.name} in payment`}
                                    />
                                    <div>
                                        <p className="font-medium text-sm">{freelancer.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            ${freelancer.hourly_rate}/hr
                                        </p>
                                    </div>
                                </label>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            <Separator />

            {/* Worklogs detail list */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Worklogs & Time Entries</h2>
                {allWorklogs.map((wl: any) => {
                    const isExcludedByFreelancer = excludedFreelancerIds.includes(
                        wl.freelancer?.id,
                    )
                    const isExcludedDirectly = excludedWorklogIds.includes(wl.id)
                    const isExcluded = isExcludedByFreelancer || isExcludedDirectly

                    return (
                        <Card
                            key={wl.id}
                            className={`transition-opacity ${isExcluded ? "opacity-40" : ""}`}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <CardTitle className="text-base">
                                                {wl.task_name}
                                            </CardTitle>
                                            <CardDescription>
                                                {wl.freelancer?.name} · {wl.total_hours}h ·{" "}
                                                <span className="font-medium text-foreground">
                                                    ${wl.total_earnings.toLocaleString()}
                                                </span>
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {isExcluded && (
                                            <Badge variant="outline" className="text-destructive border-destructive/50">
                                                Excluded
                                            </Badge>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => toggleExcludeWorklog(wl.id)}
                                            aria-label={
                                                isExcludedDirectly
                                                    ? `Re-include worklog ${wl.task_name}`
                                                    : `Remove worklog ${wl.task_name} from selection`
                                            }
                                            className="h-8 w-8"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead className="text-right">Hours</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {wl.time_entries?.map((entry: any) => (
                                            <TableRow key={entry.id}>
                                                <TableCell className="text-sm">
                                                    {entry.description}
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {entry.date}
                                                </TableCell>
                                                <TableCell className="text-right text-sm">
                                                    {entry.hours}h
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

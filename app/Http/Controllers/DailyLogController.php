<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DailyLog;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;



class DailyLogController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'mood' => 'nullable|string',
            'sleep_hours' => 'nullable|numeric|min:0|max:24',
            'water_intake' => 'nullable|integer|min:0',
            'food' => 'nullable|string',
            'symptoms' => 'nullable|string',
        ]);

        $log = DailyLog::updateOrCreate(
            ['user_id' => Auth::id(), 'date' => $request->date],
            array_merge($request->all(), ['user_id' => Auth::id()])
        );

        return response()->json([
            'message' => 'Daily log saved successfully',
            'log' => $log
        ], 200);
    }
    public function weeklyLogs()
{
    $startDate = Carbon::now()->startOfWeek(); // Monday
    $endDate = Carbon::now()->endOfWeek();     // Sunday

    $logs = DailyLog::where('user_id', Auth::id())
        ->whereBetween('date', [$startDate, $endDate])
        ->orderBy('date', 'asc')
        ->get(['date', 'sleep_hours', 'water_intake', 'mood']);

    return response()->json($logs);
}
public function weeklyTips()
{
    $startDate = now()->startOfWeek();
    $endDate = now()->endOfWeek();

    $logs = DailyLog::where('user_id', Auth::id())
        ->whereBetween('date', [$startDate, $endDate])
        ->get();

    if ($logs->isEmpty()) {
        return response()->json(['tips' => ['No data yet. Fill in your daily check-ins!']]);
    }

    $avgSleep = round($logs->avg('sleep_hours'), 1);
    $avgWater = round($logs->avg('water_intake'), 1);

    $moodMap = ['😀' => 3, '😐' => 2, '😞' => 1];
    $avgMood = round($logs->pluck('mood')->map(fn($m) => $moodMap[$m] ?? 0)->avg(), 1);

    $tips = [];

    if ($avgSleep < 6) {
        $tips[] = "😴 Try to get at least 7 hours of sleep consistently.";
    }

    if ($avgWater < 6) {
        $tips[] = "💧 Drink more water — hydration boosts mood and focus.";
    }

    if ($avgMood < 2) {
        $tips[] = " It’s been a tough week emotionally — take some time to relax and recharge.";
    }

    if (empty($tips)) {
        $tips[] = " Great job! You’re maintaining healthy habits this week!";
    }

    return response()->json(['tips' => $tips]);
}
public function hasTodayLog()
{
    $today = now()->toDateString();

    $hasLog = DailyLog::where('user_id', Auth::id())
        ->whereDate('date', $today)
        ->exists();

    return response()->json(['hasLog' => $hasLog]);
}
public function streak()
{
    $user = Auth::user();
    $logs = DailyLog::where('user_id', $user->id)
        ->orderByDesc('date')
        ->pluck('date')
        ->map(fn($date) => \Carbon\Carbon::parse($date)->toDateString());

    $today = now()->toDateString();
    $streak = 0;

    foreach ($logs as $logDate) {
        if ($logDate === now()->subDays($streak)->toDateString()) {
            $streak++;
        } else {
            break;
        }
    }

    // Update longest streak
    if ($streak > $user->longest_streak) {
        $user->update(['longest_streak' => $streak]);
    }

    return response()->json([
        'streak' => $streak,
        'last_broken' => $logs->count() > $streak ? $logs[$streak] : null,
        'longest_streak' => $user->longest_streak,
    ]);
}
public function heatmapData()
{
    $logs = DailyLog::where('user_id', Auth::id())
        ->select('date')
        ->get()
        ->groupBy('date')
        ->map(function ($entries, $date) {
            return [
                'date' => $date,
                'count' => 1, // based on intensity/mood/sleep
            ];
        })
        ->values();

    return response()->json($logs);
}



}
